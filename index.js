const inquirer = require('inquirer');
const fs = require('fs');
//required dependencies

//const for generated readme and the template literal for readme content
const generateReadme = ({ title, description, installation, usage, contributing, tests, license, github, email, badge }) =>
`# ${title}

## Description
${description}

${badge}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${installation}

## Usage
${usage}

## Contributing
${contributing}

## Tests
${tests}

## License
This project is licensed under the ${license} license.

## Questions
If you have any questions, please feel free to reach out to me at my GitHub: [${github}](https://github.com/${github})
or by email: ${email}
`;

//inquirer prompts for user input
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Give a brief description of your project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use.',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'What are the guidelines for contributing to your project?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What are the steps to test your project?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license does your project have?',
        choices: ['MIT', 'GNU', 'Apache', 'ISC', 'None'],
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is an email address that you can be reached at?',
      },
       
])
.then((answers) => {
    const readmeContent = generateReadme(answers);

    //if statements that check for the license chosen and assigns the appropriate badge link
    if (answers.license === 'MIT') {
        answers.badge = '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
    } else if (answers.license === 'GNU') {
        answers.badge = '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)';
    } else if (answers.license === 'Apache') {
        answers.badge = '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
    } else if (answers.license === 'ISC') {
        answers.badge = '![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)';
    } else {
        answers.badge = '![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)';
    }

    fs.writeFile('readme.md', readmeContent, (err) =>
    err ? console.log(err) : console.log('Successfully created readme!')
  );
});