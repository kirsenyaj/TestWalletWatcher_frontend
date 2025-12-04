import { registerRootComponent } from 'expo';

import Dashboard from './Dashboard';

// registerRootComponent calls AppRegistry.registerComponent('main', () => Dashboard);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Dashboard);