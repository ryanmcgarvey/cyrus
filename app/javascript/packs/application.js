import {$, jquery} from 'jquery';
window.jQuery = jQuery
window.$ = $


import 'semantic-ui/dist/semantic.css'

import App    from 'app';
import WebpackerReact from 'webpacker-react'

WebpackerReact.setup({App});
