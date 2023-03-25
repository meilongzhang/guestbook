import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './application.css';
import Form from './Form';

const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<Form />
	</StrictMode>
);
