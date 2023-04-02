import axios from 'axios';
import React from 'react';
import Input from '../components/Input';

const Auth = () => {
	const [userInput, setUserInput] = React.useState({
		email: '',
		name: '',
		password: '',
	});
	const [name, setName] = React.useState('');
	const [variant, setVariant] = React.useState('login');

	const toggleVariant = React.useCallback(
		() => setVariant((prev) => (prev === 'login' ? 'register' : 'login')),
		[]
	);

	const register = React.useCallback(async () => {
		try {
			await axios.post('/api/register', {
				...userInput,
				name,
			});
		} catch (error) {}
	}, [userInput, name]);
	return (
		<div
			className={`relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover `}
		>
			<div className='bg-black h-full w-full lg:bg-opacity-60 overflow-y-auto pb-4'>
				<nav className='px-12 py-5'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src='/images/logo.png' alt='netflix' className='h-12' />
				</nav>
				<div className='flex justify-center'>
					<div className='bg-black bg-opacity-70 px-12 py-12 self-center mt-2 lg:w-2/5  lg:max-w-md rounded-md w-full '>
						<h2 className='text-white text-4xl mb-8 font-semibold '>
							{variant == 'login' ? 'Login' : 'Sign up'}
						</h2>
						<div className='flex flex-col gap-4'>
							{variant == 'register' ? (
								<Input
									id='name'
									label='name'
									value={name}
									type='text'
									onChange={(e) => setName(e.target.value)}
								/>
							) : null}
							<Input
								id='email'
								label='Email'
								value={userInput.email}
								type='email'
								onChange={(e) =>
									setUserInput((prev) => ({ ...prev, email: e.target.value }))
								}
							/>
							<Input
								id='name'
								label='name'
								value={userInput.name}
								type='text'
								onChange={(e) =>
									setUserInput((prev) => ({ ...prev, name: e.target.value }))
								}
							/>
							<Input
								id='password'
								label='password'
								value={userInput.password}
								type='password'
								onChange={(e) =>
									setUserInput((prev) => ({
										...prev,
										password: e.target.value,
									}))
								}
							/>
							<button
								className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700'
								onClick={register}
							>
								{variant == 'login' ? 'Login' : 'Sign up'}
							</button>
							<p className='text-neutral-500 mt-6 text-left'>
								{variant == 'login'
									? 'First time using netflix'
									: 'Have you an account'}
								?
								<span
									className='text-red-600 px-2 cursor-pointer'
									onClick={toggleVariant}
								>
									{variant == 'login' ? 'Create an account' : 'login'}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
