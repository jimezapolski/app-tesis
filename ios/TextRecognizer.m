//
//  TextRecognizer.m
//  apptesis
//
//  Created by Jime Zapolski on 01/10/2025.
//

#import <React/RCTBridgeModule.h>

// Declara el módulo con el NOMBRE que usa JS: "TextRecognizer"
@interface RCT_EXTERN_MODULE(TextRecognizer, NSObject)

// Expone el método asíncrono (Promise) a JS:
//   - (NSString *)base64
//   - (RCTPromiseResolveBlock)resolve
//   - (RCTPromiseRejectBlock)reject
RCT_EXTERN_METHOD(recognize:(NSString *)base64
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
