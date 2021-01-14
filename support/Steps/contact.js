
const  webdriver = require("selenium-webdriver")
const JavascriptExecutor =  require("selenium-webdriver")
const { Before, Given, When, Then, AfterAll  } = require('@cucumber/cucumber');

const expect = require("chai").expect
const { By, until } =  webdriver



let driver;
const  desiredCaps = {
    platformName: "Android",
    deviceName: "emulator-5554",
    appPackage: "com.android.contacts",
    appActivity: "com.android.contacts.activities.PeopleActivity",
    browserName: ''
        
};

Before({timeout: 3 * 5000}, async() => {
    driver = await new webdriver.Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).build()
})



When(/^I click on the fab button$/ , async() =>  {
     await driver.findElement(By.xpath("//*[@resource-id='com.android.contacts:id/floating_action_button_container']")).click()
     const element=  await driver.wait(until.elementLocated(By.xpath("//*[@resource-id='com.android.contacts:id/left_button']")))
     await element.click()
})

Then(/^I should be able to create a contact with the following details$/, {timeout: 5 * 5000}, async() => {


    const firstNameInput = await driver.wait(until.elementLocated(By.xpath("//*[@text='First name']")))
    await firstNameInput.sendKeys("Bring")

    await driver.findElement(By.xpath("//*[@text='Last name']")).sendKeys("Digital")
    await driver.findElement(By.xpath("//*[@text='Phone']")).sendKeys("+351 911111111")
    // change to Other 
    await driver.findElement(By.xpath("//android.widget.Spinner[@content-desc='Phone']")).click()
    const otherSpinnerValue =  await driver.wait(until.elementLocated(By.xpath("//*[@text='Other']")))
    await otherSpinnerValue.click()

    const emailInput = await driver.wait(until.elementLocated(By.xpath("//*[@text='Email']")))
    emailInput.sendKeys("Sonia.pereira@bringglobal.com")
    await driver.findElement(By.xpath("//android.widget.Spinner[@content-desc='Email']")).click()
    const workSpinnerValue =  await driver.wait(until.elementLocated(By.xpath("//*[@text='Work']")))
    await workSpinnerValue.click()
    await driver.findElement(By.xpath("//*[@text='SAVE']")).click()
    
})

Then (/^I should be able to edit contact created$/, {timeout: 5 * 5000}, async () =>{
    
        const editIcon = await driver.wait(until.elementLocated(By.xpath("//android.widget.TextView[@content-desc='Edit']")))
        await editIcon.click()
        const firstName = await driver.wait(until.elementLocated(By.xpath("//android.widget.LinearLayout/android.widget.EditText[1]")))
        await firstName.sendKeys("Bring")
        const lastName = await driver.wait(until.elementLocated(By.xpath("//android.widget.LinearLayout/android.widget.EditText[2]")))
        await lastName.sendKeys("Global")
        await driver.findElement(By.xpath("//*[@text='SAVE']")).click()
        
})

AfterAll(() => {
    driver.quit()
})


