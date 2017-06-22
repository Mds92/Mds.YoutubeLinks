import { YoutubeLinksAngularPage } from './app.po';

describe('youtube-links-angular App', () => {
  let page: YoutubeLinksAngularPage;

  beforeEach(() => {
    page = new YoutubeLinksAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
