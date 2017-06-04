import {$, jquery} from 'jquery';
window.jQuery = jQuery
window.$ = $

import App    from 'app';
import WebpackerReact from 'webpacker-react'

WebpackerReact.setup({App});
