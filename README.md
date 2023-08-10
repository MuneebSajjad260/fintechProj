# FintechHub-Mobile-Apps

### Value issue on xcode 
1.Open node_modules/react-native/scripts/react_native_pods.rb
2.Go to line no 401 >>> 'ios' => '11.0',
3.Change 11.0 to 12.0
4.Use patch-package to make a patch.
5.Run yarn
6.Run pod install
7.Go to ios/build/generated/ios/React-Codegen.podspec.json and confirm "platforms": { "ios": "12.0" }