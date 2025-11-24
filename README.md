## Your Info:

Matric Number:  
Name:

## Objective

Convert the existing static HTML resume website into a single-page application (SPA) using Angular, and publish it using GitHub Pages.


## Learning Outcomes
By the end of this tutorial, students should be able to:
1. Install and use Angular CLI to create a basic Angular project.
1. Convert existing HTML pages (Home, Hobbies, Contact) into Angular components.
1. Configure Angular routing to navigate between pages.
1. Apply CSS styles using styles.css and/or component styles.
1. Upload an Angular project to GitHub and deploy it to GitHub Pages.

## Prerequisites
Before starting, make sure you already have:
1. Completed previous Tutorial (static HTML resume website).
2. A GitHub account and Git installed on your computer.
3. Node.js and npm installed:
```
node -v
npm -v
```
4. VS Code or WebStorm

## PART A: Create a New Angular Project
### 1. Install Angular CLI (if not installed):
```
npm install -g @angular/cli
```

### 2. Create a new Angular project (you can choose your own name):
```
ng new my-resume-angular
```
When asked:
- Add Angular routing? → Yes
- Stylesheet format? → CSS
  
### 3. Go into the project folder:
```
cd my-resume-angular
```

### 4. Test the project:
```
ng serve --open
```
Your app should open at `http://localhost:4200/`

## Part B: Create Pages as Angular Components
You must have three pages: Home, Hobbies, Contact. Each page will be one Angular component.

### 1. Generate components:
```
ng g c pages/home
ng g c pages/hobbies
ng g c pages/contact
```

### 2. Open your old static project from your previous Tutorial and:
- Copy the Home page HTML into src/app/pages/home/home.html.
- Copy the Hobbies content into src/app/pages/hobbies/hobbies.html.
- Copy the Contact content into src/app/pages/contact/contact.html.

## Part C: Set Up Routing and Navigation
### 1. Open `src/app/app.routes.ts` and define your routes:
```ts
import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Hobbies} from './pages/hobbies/hobbies';
import {Contact} from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'hobbies', component: Hobbies },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' } // unknown path → Home
];
```

### 2. Update `src/app/app.ts`
```ts
import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-resume-angular');
}
```

### 3. Open `src/app/app.html` and create a simple menu:
```html
<nav>
  <a routerLink="">Home</a> |
  <a routerLink="hobbies">Hobbies</a> |
  <a routerLink="contact">Contact</a>
</nav>
<hr>

<router-outlet></router-outlet>
```

### 3. Test again:
```
ng serve --open
```
Click the links to make sure you can navigate between Home, Hobbies, and Contact.


## Part D: Styling with CSS
### 1. You can put common styles in src/styles.css (global styles).
### 2. You can also style each page using the component CSS files:
- home.css
- hobbies.css
- contact.css

### 3. Reuse styles from your old style.css:
   - Copy relevant rules into styles.css or split them into component CSS files.
  

## Part E: Upload Angular Project to GitHub
1. On GitHub, create a new empty repository, for example: `my-resume-angular`
2. In your Angular project folder (my-resume-angular), run:
```
git init
git add .
git commit -m "Initial Angular resume site"
git branch -M main
git remote add origin https://github.com/<yourusername>/my-resume-angular.git
git push -u origin main
```
Important: Replace `<yourusername>` with your actual GitHub username.


## Part F: Build & Deploy to GitHub Pages
### Step 1: Build the Angular App

1. In the project folder, run:
```
ng build --configuration=production --base-href "https://<yourusername>.github.io/my-resume-angular/"
```
- Replace <yourusername> with your GitHub username.
- After build, the output will be in `dist/my-resume-angular/` (or `dist/my-resume-angular/browser` depending on Angular version).

### Step 2: Deploy Using angular-cli-ghpages (Simple Method)
1. Install the deploy tool:
```
npm install -g angular-cli-ghpages
```

2. Deploy to GitHub Pages (if your build output folder is `dist/my-resume-angular/browser`):
```
npx angular-cli-ghpages --dir=dist/my-resume-angular/browser
```

or (if output folder is `dist/my-resume-angular`):
```
npx angular-cli-ghpages --dir=dist/my-resume-angular
```

3. This command will:
   - Create a gh-pages branch,
   - Push the built files there.
###### Output example:
```bash
404.html file created
.nojekyll file created
🚀 Uploading via git, please wait...
Cloning https://github.com/zhamri/my-resume-angular.git into /Users/zhamri/ZhamriProjects/AngularProjects/my-resume-angular/node_modules/.cache/gh-pages/https!github.com!zhamri!my-resume-angular.git
Cleaning
Fetching origin
Checking out origin/gh-pages 
Removing files
Copying files
Adding all
Committing
Pushing
Username for 'https://github.com': zhamri
Password for 'https://zhamri@github.com': <paste your token>
🌟 Successfully published via angular-cli-ghpages! Have a nice day!
```  


### Step 3: Enable GitHub Pages
1. Go to your repo on GitHub → Settings → Pages.
2. Under Source, choose `Deploy from a branch`.
3. Select:
   - Branch: gh-pages
   - Folder: / (root)

4. Click Save.  
After a short while, your site will be available at:
```
https://<yourusername>.github.io/my-resume-angular/
```
5. Example: https://zhamri.github.io/my-resume-angular/


## Submission

1. Add your Matric Number and Name.
2. Add your GitHub Repository Link for your Angular project
   ```
   - Example: https://github.com/<yourusername>/my-resume-angular
   ```
3. Add your Live Angular Resume URL (GitHub Pages)
   ```
   - Example: https://<yourusername>.github.io/my-resume-angular/
   ```
4. Write the mistake in the git or GitHub instructions.
5. At least five (5) YouTube tutorials you watched to help you complete this task (Angular basics, Angular routing, GitHub Pages deployment, etc.).

## What is the mistake?

## GitHub Repository Link

## Live Angular Resume URL (GitHub Pages)

## Link of YouTube References (at least five references)






