// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const utils = require("./develop/utils/generateMarkdown");

const writeToFile = utils.promisify(fs.writeFile);

// TODO: Create an array of questions for user input
const init = () => 
    inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email (Required)',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter your email!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is your project name? (Required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter your project's name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter the GitHub link to your project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'],
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please enter a description of your project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter a description of your project!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for application:',
            choices: [
            'None',
            'AGPL-3.0',
            'GPL-3.0',
            'LGPL-3.0',
            'MPL-2.0',
            'Apache-2.0',
            'MIT',
            'BSL-1.0',
            'Unlicense'
        ],
            default: 'None'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please enter installation instructions for your project',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please enter usage information for your project',
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'Please enter any contribution guidelines for your project',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please list any test information for your project',
        },
    ]);
    const generateReadme = (answers) =>
`
# ${answers.title}\n
![License: MIT](https://img.shields.io/badge/License-${answers.license}-informational "License Badge")

## ${answers.link}

## ${answers.description}\n

## Table of Contents
\n* [Installation](#Installation)
\n* [Usage](#Usage)
\n* [License](#License)
\n* [Contributors](#Contributors)
\n* [Tests](#Tests)
\n* [Questions](#Questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project has the following license: ${answers.license}

## Contributors
${answers.contribution}

## Tests
${answers.tests}

## Questions
Please reach out to me with any questions:
\nEmail: ${answers.email}
\nGitHub: https://github.com/${answers.github}
`
;




// TODO: Create a function to write README file
// function writeToFile("README.md", data) {}

// TODO: Create a function to initialize app
// function init() {}

// Function call to initialize app
init()
.then((answers) => writeToFile("README.md", generateReadme(answers)))
.then(() => console.log('Success! Your README.md file has been generated'))
.catch((err) => console.error(err));
