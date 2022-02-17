import Link from 'next/link'
import css from '../styles/termAndConditions.module.css'

export default function TermsAndConditions() {

	return (
		<div className={css.pageWrapper}>
			<div className={css.pageContainer}>
				<h1>Terms And conditions</h1>
				<p>
					Welcome to Scholar Vote!
				</p>
				<p>
					These terms and conditions outline the rules and regulations for the use of Scholar Vote&apos;s Website, located at https://www.scholarvote.com.
				</p>
				<p>
					By accessing this website we assume you accept these terms and conditions. Do not continue to use Scholar Vote if you do not agree to take all of the terms and conditions stated on this page. 
				</p>
				<p>
					The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves. 
				</p>
				<h2>Cookies</h2>
				<p>We employ the use of cookies. By accessing Scholar Vote, you agreed to use cookies in agreement with the Scholar Vote&apos;s Privacy Policy.</p>
				<p>Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>
				<h2>License</h2>
				<p>
					Unless otherwise stated, Scholar Vote and/or its licensors own the intellectual property rights for all material on Scholar Vote. All intellectual property rights are reserved. You may access this from Scholar Vote for your own personal use subjected to restrictions set in these terms and conditions.
				</p>
				<p>
					You must not:
				</p>
				<p>
					<ul>
						<li>Republish material from Scholar Vote</li>
						<li>Sell, rent or sub-license material from Scholar Vote</li>
						<li>Reproduce, duplicate or copy material from Scholar Vote</li>
						<li>Redistribute content from Scholar Vote</li>
					</ul>
				</p>
				<p>
					This Agreement shall begin on the date hereof.
				</p>
				<p>
					Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Scholar Vote does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Scholar Vote, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Scholar Vote shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
				</p>
				<p>
					Scholar Vote reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
				</p>
				<p>
					You warrant and represent that:
				</p>
				<p>
					<ul>
						<li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
						<li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
						<li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
						<li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
					</ul>
				</p>
				<p>
					You hereby grant Scholar Vote a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
				</p>
				<h2>Log Files</h2>
				<p>
					Scholar Vote follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
				</p>
				<h2>iFrames</h2>
				<p>
					Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
				</p>
				<h2>Content Liability</h2>
				<p>
					We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
				</p>
				<h2>Your Privacy</h2>
				<p>
					Please read <Link href={'/privacypolicy'}>Privacy Policy</Link>
				</p>
				<h2>Reservation of Rights</h2>
				<p>
					We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
				</p>
				<h2>Removal of links from our website</h2>
				<p>
					If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
				</p>
				<p>
					We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.	
				</p>
				<h2>Disclaimer</h2>
				<p>
					To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
				</p>
				<p>
					<ul>
							<li>limit or exclude our or your liability for death or personal injury;</li>
							<li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
							<li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
							<li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
					</ul>
				</p>
				<p>
					The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
				</p>
				<p>
					As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
				</p>
				<p>
					THESE TERMS AND CONDITIONS ARE SUBJECT TO CHANGE WITHOUT NOTICE, FROM TIME TO TIME IN OUR SOLE DISCRETION.
				</p>
			</div>
		</div>
	)
}