import css from './sampleUi.module.css'

export default function SampleUi() {

	return(
		<div className={css.comWrapper}>
			<div className={css.comContainer}>
				<div className={css.phoneContainer}>
					<div className={css.phoneScreen}>

						<div className={css.NavWrapper}>
							<div>
								<img
									className={css.logo}
									alt="logo" 
									src="https://res.cloudinary.com/dzpphtqox/image/upload/v1644996339/Scholar%20Vote/logo_w6drip.png"
								/>
							</div>
							<div>
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>

						<div className={css.headerWrapper}>
							<div></div>
							<span></span>
						</div>
						
						<div className={css.uiWrapper}>

							{Array.of(1,2,3,4,5,6).map(() => {
								return <>
									<div className={css.titleContainer}>
										<span> </span>
									</div>
									<div className={css.barContainer}>
										<span> </span>
									</div>
								</>
							})}
			

						</div>

						<div className={css.footerWrapper}>
							<div></div>
							<div></div>
							<div></div>
						</div>

					</div>
				
				</div>
			</div>
		</div>
	)
}