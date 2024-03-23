const fs = require('fs');
const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Write a description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide installation instructions:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide usage information:',
  },
  {
    type: 'input',
    name: 'contribution',
    message: 'Provide contribution guidelines:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide test instructions:',
  },
  {
    type: 'list',
    message: 'Choose a license for your project:',
    name: 'license',
    choices: ['MIT', 'Apache_2.0', 'BSD_3--Clause', 'None'],
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
  },
])
.then((answers) => {

    let licenseBadgeUrl = '';
    let theUrl = '';

    if (answers.license !== 'None') {
      licenseBadgeUrl = `https://img.shields.io/badge/license-${answers.license}-blue.svg`
    }
    
    if (answers.license === 'MIT') {
      theUrl = 'https://opensource.org/license/MIT'
    } else if (answers.license === 'Apache_2.0') {
      theUrl = 'https://opensource.org/license/apache-2-0'
    } else if (answers.license === 'BSD_3--Clause') {
      theUrl = 'https://opensource.org/license/bsd-3-clause'
    }


  const readmeContent = `
# ${answers.title}

## Description
${answers.description}

${licenseBadgeUrl !== '' ? `![License](${licenseBadgeUrl})` : ''}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license !== 'None' ? `This project is licensed under the [${answers.license} license](${theUrl})` : 'No license specified.'}

## Contributing
${answers.contribution}

## Tests
${answers.tests}

## Questions
For questions or concerns regarding this project, feel free to reach out to the project owner:

- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: ${answers.email}
  `;

  fs.writeFile('README.md', readmeContent, (err) => {
    if (err) {
      console.error('Error writing README.md:', err);
    } else {
      console.log('README.md file generated successfully.');
    }
  });
})
.catch((error) => {
  console.error('Error:', error);
});
