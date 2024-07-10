import '../assets/css/Footer.css'
import linkedin from '../assets/images/linkedin.png'
import github from '../assets/images/github.png'
import andre from '../assets/images/andre.png'
import indexWriteUp from '../assets/data/writeup'


const FooterComponent = () => {
	return (
	<section id='footer' className='footer bg-gradient text-white pb-5'>
		<div className='container-lg p-5 pb-2 d-flex flex-row justify-content-between align-items-center'>
			<div className='about_me d-flex flex-row justify-content-between align-items-center col-6'>
				<img className='d-none d-sm-block' src={andre} height='50px' width='50px'/>
				<div className='mx-3'>
					<small className='about_me-text'>{indexWriteUp[0]}</small><br/>

					<small className='about_me-text'>{indexWriteUp[1]}</small><br/>

				</div>
			</div>	
			<div className='col-2'>
				<a href='https://www.linkedin.com/in/andre-tong-51b9044/'><img src={linkedin} height='50px' width='50px' className='m-2'/></a>
				<a href='https://github.com/andretdr/frontEndSuites'><img src={github} height='50px' width='50px' className='m-2'/></a>
			</div>	
		</div>

		<div className='container-lg'>
			<hr className='w-75 ms-auto me-auto'/>
		</div>

		<div className='container-lg d-flex flex-row justify-content-start align-items-center'>
			<div>
                
			</div>
		</div>
		<div>
			<p className='padding_footer m-0'></p>
		</div>
	</section>
	)
}


export default FooterComponent



