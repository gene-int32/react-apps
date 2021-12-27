/**
 * Google service.
 */
class GoogleService {
  private readonly apiUrl = 'https://apis.google.com/js/api.js';

  private static instance: GoogleService;

  constructor() {
    if (!GoogleService.instance) {
      GoogleService.instance = this;
    }
    return GoogleService.instance;
  }

  installGapi(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');

      script.setAttribute('src', this.apiUrl);
      script.addEventListener('load', () => resolve());

      try {
        document.body.appendChild(script);
      } catch (err) {
        reject();
      }
    });
  }

  load(apiName: string): Promise<void> {
    return new Promise((resolve) => {
      gapi.load(apiName, () => resolve());
    });
  }
}

export default new GoogleService();
