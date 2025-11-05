//
//  TextRecognizer.m
//  apptesis
//
//  Created by Jime Zapolski on 05/11/2025.
//
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
@import Vision;
@import UIKit;

@interface TextRecognizer : NSObject <RCTBridgeModule>
@end

@implementation TextRecognizer
RCT_EXPORT_MODULE();

// Mapear orientación
static CGImagePropertyOrientation CGImagePropertyOrientationFromUIImage(UIImageOrientation o) {
  switch (o) {
    case UIImageOrientationUp: return kCGImagePropertyOrientationUp;
    case UIImageOrientationDown: return kCGImagePropertyOrientationDown;
    case UIImageOrientationLeft: return kCGImagePropertyOrientationLeft;
    case UIImageOrientationRight: return kCGImagePropertyOrientationRight;
    case UIImageOrientationUpMirrored: return kCGImagePropertyOrientationUpMirrored;
    case UIImageOrientationDownMirrored: return kCGImagePropertyOrientationDownMirrored;
    case UIImageOrientationLeftMirrored: return kCGImagePropertyOrientationLeftMirrored;
    case UIImageOrientationRightMirrored: return kCGImagePropertyOrientationRightMirrored;
  }
}

// Quitar "data:image/...;base64,"
static NSString *StripDataUriPrefix(NSString *b64) {
  NSRange comma = [b64 rangeOfString:@","];
  return (comma.location != NSNotFound) ? [b64 substringFromIndex:comma.location + 1] : b64;
}

RCT_REMAP_METHOD(recognize,
                 recognize:(NSString *)base64
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0), ^{
    @try {
      NSString *clean = StripDataUriPrefix(base64);
      NSData *data = [[NSData alloc] initWithBase64EncodedString:clean
                                                         options:NSDataBase64DecodingIgnoreUnknownCharacters];
      if (!data) { reject(@"decode_error", @"No pude decodificar base64", nil); return; }

      UIImage *image = [UIImage imageWithData:data];
      if (!image || !image.CGImage) { reject(@"image_error", @"Imagen inválida para OCR", nil); return; }

      NSLog(@"[OCR] bytes:%lu w:%f h:%f orient:%ld",
            (unsigned long)data.length, image.size.width, image.size.height, (long)image.imageOrientation);

      __block NSMutableArray<NSString *> *linesOut = [NSMutableArray array];

      VNRecognizeTextRequest *req = [[VNRecognizeTextRequest alloc] initWithCompletionHandler:
        ^(VNRequest *request, NSError * _Nullable error) {
          if (error) { NSLog(@"[OCR] req error: %@", error.localizedDescription); return; }
          for (VNRecognizedTextObservation *obs in request.results) {
            VNRecognizedText *top = [[obs topCandidates:1] firstObject];
            if (top) [linesOut addObject:top.string ?: @""];
          }
      }];

      // Ajustes importantes
      req.recognitionLevel = VNRequestTextRecognitionLevelAccurate;
      req.usesLanguageCorrection = YES;
      if ([req respondsToSelector:@selector(setMinimumTextHeight:)]) {
        req.minimumTextHeight = 0.02; // 2% de la altura
      }
      req.recognitionLanguages = @[@"es-AR", @"es-ES", @"es", @"en-US", @"en"];
      if ([req respondsToSelector:@selector(setRevision:)]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wunguarded-availability-new"
        req.revision = VNRecognizeTextRequestRevision3; // iOS 15+/17 compatible
#pragma clang diagnostic pop
      }

      NSError *err = nil;
      VNImageRequestHandler *handler =
        [[VNImageRequestHandler alloc] initWithCGImage:image.CGImage
                                           orientation:CGImagePropertyOrientationFromUIImage(image.imageOrientation)
                                               options:@{}];

      [handler performRequests:@[req] error:&err];
      if (err) { reject(@"vision_error", err.localizedDescription, err); return; }

      NSLog(@"[OCR] lines: %lu", (unsigned long)linesOut.count);
      resolve(linesOut ?: @[]);
    } @catch (NSException *e) {
      reject(@"ocr_exception", e.reason, nil);
    }
  });
}
@end
 
