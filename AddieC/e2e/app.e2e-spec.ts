import { AddieCPage } from './app.po';

describe('addie-c App', () => {
  let page: AddieCPage;

  beforeEach(() => {
    page = new AddieCPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
