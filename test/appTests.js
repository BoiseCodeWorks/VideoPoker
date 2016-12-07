var expect = require('chai').expect;
var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var By = selenium.By;

const timeOut = 15000;

test.describe('VideoPoker App', function() {

    var driver;
    var dealBtn;
    var betInput;
    var balanceSpan;

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

    test.beforeEach(function(done) {

        driver.findElements(By.id('deal'))
            .then(function(elements) {
                dealBtn = elements[0];

                driver.findElements(By.id('bet'))
                    .then(function(elements) {
                        betInput = elements[0];

                        driver.findElements(By.id('balance'))
                            .then(function(elements) {
                                balanceSpan = elements[0];
                                done();
                            });
                    });
            });
    });

    test.it('Loads properly.', function() {

        expect(dealBtn).to.not.be.undefined;
        expect(betInput).to.not.be.undefined;
        expect(balanceSpan).to.not.be.undefined;
    });

    test.it('The deal button is disabled when no bet is entered.', function() {

        dealBtn.getAttribute('class')
            .then(function(classes) {
                expect(classes).to.have.string('disabled');
            });
    });

    test.it('The deal button is enabled after a bet is entered.', function() {

        betInput.sendKeys('5');
        balanceSpan.click();

        dealBtn.getAttribute('class')
            .then(function(classes) {
                expect(classes).to.not.have.string('disabled');
            });
    });

});