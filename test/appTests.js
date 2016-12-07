var expect = require('chai').expect;
var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

const timeOut = 15000;

test.describe('VideoPoker App', function() {

    var driver;

    test.before(function() {

        this.timeout(timeOut);

        driver = new selenium.Builder().
            forBrowser('chrome').
            build();

        driver.get("http://localhost:9966");
    });

    test.after(function() {
        driver.quit();
    });

    test.it('Loads properly', function() {

        driver.findElements(selenium.By.id('bet'))
            .then(function(elements) {
                expect(elements.length).to.equal(1);
            });
    });
});