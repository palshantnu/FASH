
jest.mock('react-native-elements', () => ({
    Input: jest.fn().mockImplementation(({ placeholder }) => (
      {}
    )),
    Button: jest.fn().mockImplementation(({ title, onPress }) => (
      {}
    )),
    // Add other components you want to mock
  }));