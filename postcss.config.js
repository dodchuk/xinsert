function calculateAliasPath(alias) {
  let aliasRegex = new RegExp(`.*\\/${ alias }\\/`);

  return asset => {
    // Fixing urls from aliases
    let steps = asset.absolutePath.split('~');
    steps = (steps[0].replace(aliasRegex, '').split('/'));
    steps.pop();
    let urlPatch = steps.reduce((buf) => buf += '../', './');

    return asset.url.replace(`~/${ alias }/`, urlPatch);
  };
}

module.exports = {
  plugins: {
    'postcss-easy-import': {},
    'postcss-url': [
      { filter: '**/~/ui/**/*', url: calculateAliasPath('ui') }
    ]
  }
};
