module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'select',
        name: 'category',
        message: 'Which design level?',
        choices: ['common', 'components', 'layout', 'pages'],
      },
      {
        type: 'input',
        name: 'component_name',
        message: 'What is the component name?',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { category, component_name } = answers;
      const path = category === 'components' ? `${component_name}` : `${category}/${component_name}`;
      const absPath = `src/components/${path}`;
      return { ...answers, path, absPath, category };
    });
  },
};
