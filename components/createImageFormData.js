export function createImageFormData(img) {
    return {
      name: "photo.jpg",
      type: img.type,
      uri: Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.uri,
    };
  }