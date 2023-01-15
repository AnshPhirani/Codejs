const boilerHtml = `<!-- These are called comments! You can use them to leave notes about your code for yourself or other people -->

<!-- Here's the html's body part of your website -->
<header>
  <h1>Hello my name is:<br />[WRITE YOUR NAME]</h1>
</header>

<!-- This is where you can edit the middle part of your website -->
<main>
    <aside id="me">
      <h2>About Me</h2>
      <p>[WRITE 3 SENTENCES ABOUT YOURSELF]</p>

      <h2>These are my four favorite animals:</h2>
      <!-- Ordered list -->
      <ol>
        <li>[FIRST FAVORITE ANIMAL]</li>
        <li>[SECOND FAVORITE ANIMAL]</li>
        <li>[THIRD FAVORITE ANIMAL]</li>
        <li>[FOURTH FAVORITE ANIMAL]</li>
      </ol>
    </aside>

  <section id="my-family">
      <h3>About My Family</h3>
      <p>[WRITE 3 SENTENCES ABOUT YOUR FAMILY]</p>
  </section>
</main>

<section id="anything">
  <h3>[THIS SECTION IS ABOUT....]</h3>
  <p>[WRITE 3 SENTENCES ABOUT ANYTHING YOU WANT]</p>
</section>

<!-- This is where bottom part of your website starts -->
<footer>
  Thanks for looking at my BEAUTIFUL website!<br />
  Coded by: Ansh Phirani on <strong>December 10th, 2023</strong>
</footer>`;

const boilerCSS = `/* This is how you write comments for CSS */

/* Change the size, style, and color of your border.
The color names that the web accepts can be found here: https://www.w3schools.com/cssref/css_colornames.asp */
body{
  border:5px solid black;
}

/* Edit the background and text color for your header section. */
header {
  background-color:white;
  color:black;
  text-align:center;
}

/* Pick a new font family and size for "Hello my name is: your name" */
h1{
  font-family:Times;
  font-size:28px;
}

/* Pick a new font family and size for "These are my four favorite animals" */
h2{
  font-family:Times;
  font-size:24px;
}

/* Change the width of the left side of your website, watch how it also changes the right side! */
main aside {
  background-color:lightgray;
  color:black;
  font-family:Times;
  font-size:16px;
  width: 30%;
}

/* These are the styles for the right side of your website */
main section {
  background-color:gray;
  color:black;
  font-family:Times;
  font-size:16px;
}

section{
  background-color:linen;
  color:black;
  font-family:Times;
  font-size:16px;
}

/* These are the styles for the bottom part of your website */
footer {
  background-color:black;
  color:white;
  font-family:Times;
  font-size:20px;
  text-align:center;
}

/*/////////////////////////
Feel free to explore these later, they are more advanced styles that control the layout of the site. You can read more about each property and selector here: https://www.w3schools.com/css/default.asp
/////////////////////////*/
* {
  box-sizing:border-box;
}

main {
  display:table;
  width:100%;
}

ol li {
  margin-bottom:30px;
}

main aside {
  display:table-cell;
  padding:20px;
}

main section {
  display:table-cell;
  padding:20px;
}

section {
  display:table;
  padding:20px;
  width:100%;
}

footer {
  padding:12px;
}`;

const boilerJS = `// This is how you write comments for JavaScript

function sayHello(){
  console.log("Hello World!");
}
sayHello();`;

export { boilerHtml, boilerCSS, boilerJS };
