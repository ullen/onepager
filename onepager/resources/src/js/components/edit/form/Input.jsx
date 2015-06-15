const _             = require('underscore');
const React         = require('react');
const Input         = require('react-bootstrap/lib/Input');
const ColorPicker   = require('./ColorPicker.jsx');
const IconSelector  = require('./IconSelector.jsx');
const ImageIcon     = require('./ImageIcon.jsx');
const WpMedia       = require('./WpMedia.jsx');
const Select        = require('./Select.jsx');
const WpSelect      = require('./WpSelect.jsx');

const PreMixin      = require('react/lib/ReactComponentWithPureRenderMixin');
const Activity      = require('../../../lib/Activity');

let inactive        = Activity(100); //jshint ignore:line

let InputControl = React.createClass({
  mixins: [PreMixin],

  getValue(){
    return this.refs.input.getValue();
  },

  onChange(){
    inactive().then(()=> this.props.onChange() );
  },

  render() {
      let control, options = this.props.options; //because I need to mutate

      switch(options.type){
        case "icon":
            <IconSelector ref="input"
              className={options.class}
              defaultValue={options.value}
              label={options.label}
              onChange={this.onChange}/>;
          break;

        case "image":
          control =
            <WpMedia ref="input"
              className={options.class}
              defaultValue={options.value}
              label={options.label}
              onChange={this.onChange}/>;
          break;

        case "imicon":
          control =
            <ImageIcon ref="input"
              className={options.class}
              defaultValue={options.value}
              label={options.label}
              onChange={this.onChange}/>;
          break;

        case "colorpicker":
          control =
            <ColorPicker ref="input"
              className={options.class}
              defaultValue={options.value}
              label={options.label}
              onChange={this.onChange}/>;
          break;

        case "menu":
        case "page":
        case "category":
          control =
            <WpSelect ref="input" type={options.type}
              className={options.class}
              label={options.label}
              defaultValue={options.value}
              onChange={this.onChange}/>;
          break;

        case "select":
          control =
            <Select ref="input"
              className={options.class}
              type={options.type}
              options={options.options}
              defaultValue={options.value}
              label={options.label}
              onChange={this.onChange}/>;
          break;

        case "text":
        case "textarea":
          let addons = _.pick(options, ['addonBefore', 'addonAfter']);
          control =
            <Input ref="input"
              {...addons}
              type={options.type}
              label={options.label}
              className={options.class}
              placeholder={options.placeholder}
              defaultValue={options.value}
              onChange={this.onChange}/>;
      }

      return (
        <div>{control}</div>
      );
  }
});

module.exports = InputControl;
