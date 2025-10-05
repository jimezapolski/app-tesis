import Foundation
import Vision
import UIKit

public typealias RCTPromiseResolveBlock = (Any?) -> Void
public typealias RCTPromiseRejectBlock  = (_ code: String?, _ message: String?, _ error: Error?) -> Void

@objc(TextRecognizer)
class TextRecognizer: NSObject {

  // RN no necesita main thread para inicializar
  @objc static func requiresMainQueueSetup() -> Bool { false }

  // Método que se expone a JS (promesa)
  // Firma debe coincidir con la del .m (@interface RCT_EXTERN_MODULE)
  @objc(recognize:resolver:rejecter:)
  func recognize(_ base64: NSString,
                 resolver resolve: @escaping RCTPromiseResolveBlock,
                 rejecter reject: @escaping RCTPromiseRejectBlock) {

    // 1) Decodificar imagen
    guard let data = Data(base64Encoded: base64 as String, options: .ignoreUnknownCharacters),
          let uiImage = UIImage(data: data) else {
      reject("image_error", "No se pudo decodificar la imagen base64", nil)
      return
    }

    // 2) Preferimos cgImage para Vision
    let handler: VNImageRequestHandler
    if let cg = uiImage.cgImage {
      handler = VNImageRequestHandler(cgImage: cg, orientation: .up, options: [:])
    } else if let ci = CIImage(image: uiImage) {
      handler = VNImageRequestHandler(ciImage: ci, options: [:])
    } else {
      reject("image_error", "No se pudo crear CIImage", nil)
      return
    }

    // 3) OCR request
    let request = VNRecognizeTextRequest { req, err in
      if let err = err {
        reject("vision_error", err.localizedDescription, err)
        return
      }
      let observations = (req.results as? [VNRecognizedTextObservation]) ?? []
      let lines: [String] = observations.compactMap { $0.topCandidates(1).first?.string }
      resolve(lines) // <- esto vuelve al JS
    }

    if #available(iOS 16.0, *) {
      request.recognitionLevel = .accurate
      request.usesLanguageCorrection = true
      request.revision = VNRecognizeTextRequestRevision3
    } else {
      request.recognitionLevel = .accurate
      request.usesLanguageCorrection = true
    }

    do {
      try handler.perform([request])
    } catch {
      reject("perform_error", error.localizedDescription, error)
    }
  }
}

