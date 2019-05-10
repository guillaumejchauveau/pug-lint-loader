const { getOptions } = require('loader-utils')
const formatter = require('@maxwellewxam/linting-common-formatter').pugLint
const Linter = require('pug-lint')
const configFile = require('pug-lint/lib/config-file')

const linter = new Linter()

module.exports = function(source) {
  if (getOptions(this) && getOptions(this).config) {
    linter.configure(getOptions(this).config)
  } else {
    linter.configure(configFile.load(null, this.rootContext))
  }

  const messages = linter.checkString(source, this.resourcePath)

  if (messages.length) {
    this.emitWarning(new Error(formatter(messages)))
  }

  return source
}
