/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
console.log(__dirname);
jest.dontMock("fs");

describe("link", function () {
  // console.log(html.toString())
  // beforeEach(() => {
  //     const ddiv = document.createElement('div');
  //     ddiv.innerHTML = html.toString();
  //     document.body.appendChild(ddiv);
  // });

  document.body.innerHTML = html.toString();

  // afterEach(() => {
  //     // restore the original func after test
  //     jest.resetModules();
  // });

  var as = document.body.querySelectorAll("a");
  // console.log("as",as[0].getAttribute("href"))

  // it('button exists', function () {
  //     expect(document.querySelectorAll('a')).toBeTruthy();
  // });
  const cases = [
    [as[0].href, "https://github.com/amapic"],
    [as[1].href, "https://www.linkedin.com/in/amaurypichat/"],
    [as[2].href, "http://localhost/images/cv_AmauryPICHAT.pdf"],
    [as[3].href, "http://localhost/agap2/index.html"],
    [as[4].href, "http://localhost/agap2/index.html"],
    [as[5].href, "http://localhost/slide/index.html"],
    [as[6].href, "http://localhost/slide/index.html"],
    [as[7].href, "http://localhost/siteWeb1/index.html"],
    [as[8].href, "http://localhost/siteWeb1/index.html"],
    [as[9].href, "http://localhost/planet/index.html"],
    [as[10].href, "http://localhost/planet/index.html"],
  ];

  test.each(cases)(
    "given %p  as arguments, returns %p",
    (firstArg, expectedResult) => {
      //   const result = add(firstArg, secondArg);
      //   const result = firstArg.href;
      expect(firstArg).toEqual(expectedResult);
    }
  );
});
