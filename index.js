// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const writeFile = require("./utils/generateFile");
const utils = require("./utils/generateMarkdown");

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

init()
    .then(readmeData => {
        return utils(readmeData);
    })
    .then(pageInfo => {
        return writeFile(pageInfo);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
    })
    .catch(err => {
        console.log(err);
});
