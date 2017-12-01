import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class MailSendTest {
  private WebDriver driver;
  private String url;
  private String username;
  private String password;
  private String recipient;
  private String messageText;
  UUID id;
  private String messageSubject;
  String keysPressed;


  @Before
  public void beforeMethod() {
    driver = new ChromeDriver();
    url = "https://gmail.com";
    username;
    password;
    recipient = username;
    messageText = "Test Message";
    id = UUID.randomUUID();
    messageSubject = "Subject " + id;
    keysPressed =  Keys.chord(Keys.CONTROL, Keys.ENTER);
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testMethod() {
    driver.get(url);
    driver.findElement(By.cssSelector("input#identifierId")).sendKeys(username);
    driver.findElement(By.cssSelector("div#identifierNext")).click();
    driver.findElement(By.cssSelector("div#password input")).sendKeys(password);
    driver.findElement(By.cssSelector("div#password input")).sendKeys(Keys.ENTER);
//    driver.findElement(By.cssSelector("div#passwordNext span")).click();
    driver.findElement(By.cssSelector("div.aic div div")).click();
    driver.findElement(By.xpath("//textarea[@name='to']")).sendKeys(recipient);
    driver.findElement(By.xpath("//input[@name='subjectbox']")).sendKeys(messageSubject);
    driver.findElement(By.xpath("//div[@aria-label='Message Body']")).sendKeys(messageText);
    driver.findElement(By.xpath("//div[@aria-label='Message Body']")).sendKeys(keysPressed);
    driver.findElement(By.xpath("//a[@title='Sent Mail']")).click();
    List<WebElement> subjects = driver.findElements(By.cssSelector("//span[@class='bog']/b[text()='" + messageSubject + "']"));
    assertTrue("Error Message", subjects.size() > 0);


  }

  @After
  public void afterMethod() {
    driver.quit();
  }
}
