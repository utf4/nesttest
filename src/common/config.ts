import type { Config } from './config.interface';

const config: Config = {
  security: {
    expiresIn: '30d',
    refreshIn: '30d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
