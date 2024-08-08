import { createBridgeComponent } from '@module-federation/bridge-react';
import rootComponent from './app';

export default createBridgeComponent({ rootComponent });
