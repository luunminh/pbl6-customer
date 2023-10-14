const configs = {
  API_URL: import.meta.env.VITE_API_URL,
  COOKIE_DOMAIN: import.meta.env.VITE_COOKIE_DOMAIN,
};

const table = {
  ROWS_PER_PAGE: 10,
};

const common = {
  CONNECTION_TIMEOUT: 30000,
  MAXIMUM_FILE_SIZE: 1024 * 1024 * 50, // 50 MB
  WAITING_TIME: 5000, // 5 secs
  ANIMATION_TIME: 300,
  MAXIMUM_AVATAR_SIZE: 16 * 1024 * 1024, // 16MB
};

const textLength = {
  CODE_LENGTH: 16,
  TEXT_SHORT_LENGTH: 50,
  TEXT_MEDIUM_LENGTH: 100,
  TEXT_MAX_LENGTH: 255,
  VERIFICATION_CODE_LENGTH: 6,
};

export default {
  ...configs,
  ...common,
  ...table,
  ...textLength,
};
