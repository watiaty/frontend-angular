const url = 'http://localhost:8080';
export const environment = {
  production: false,
  apiUrl: url,
  authUrl: url + '/api/v1/auth',
  wordUrl: url + '/api/v1/word',
  wordsUrl: url + '/api/v1/words',
  userUrl: url + '/api/v1/user',
  languageUrl: url + '/api/v1/language',
  accessTokenString: 'access-token',
  refreshTokenString: 'refresh-token',
  userString: 'current-user',
};
