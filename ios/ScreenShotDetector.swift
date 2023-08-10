import Foundation

@objc(ScreenshotDetector)
class ScreenshotDetector: RCTEventEmitter {

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["ScreenshotTaken"]
  }

  @objc func startListening() {
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(screenshotTaken),
      name: UIApplication.userDidTakeScreenshotNotification,
      object: nil
    )
  }

  @objc func stopListening() {
    NotificationCenter.default.removeObserver(
      self,
      name: UIApplication.userDidTakeScreenshotNotification,
      object: nil
    )
  }

  @objc func screenshotTaken() {
    sendEvent(withName: "ScreenshotTaken", body: nil)
  }
}
