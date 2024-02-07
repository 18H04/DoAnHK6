import React from "react";


class Footer extends React.Component {
	render() {
		return (

			<footer class="footer">
				<div class="newsletter">
					<div class="container">
						<div class="row">
							<div class="col-lg-6">
								<div class="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
									<h4>Newsletter</h4>
									<p>Subscribe to our newsletter and get 20% off your first purchase</p>
								</div>
							</div>
							<div class="col-lg-6">
								<form action="post">
									<div class="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
										<input id="newsletter_email" type="email" placeholder="Your email" required="required" data-error="Valid email is required." />
										<button id="newsletter_submit" type="submit" class="newsletter_submit_btn trans_300" value="Submit">subscribe</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div class="container">
					<div class="row">
						
							<div class=" col ">
								<ul class="footer_nav">
									<li><a href="#">Blog</a></li>
									<li><a href="#">FAQs</a></li>
									<li><a href="contact.html">Contact us</a></li>
								</ul>

							</div>
							<div className= " col ggmap">
								<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5138654110915!2d106.69867477476637!3d10.771899359277786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEvhu7kgdGh14bqtdCBDYW8gVGjhuq9uZw!5e0!3m2!1svi!2s!4v1705943349443!5m2!1svi!2s"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
							</div>
						
						
					</div>
					<div class="p-t-40">
						<div class="flex-c-m flex-w p-b-18">
							<a href="#" class="m-all-1">
								<img className="imgFooter" src="./asset/images/icons/icon-pay-01.png" alt="ICON-PAY" />
							</a>

							<a href="#" class="m-all-1">
								<img className="imgFooter" src="./asset/images/icons/icon-pay-02.png" alt="ICON-PAY" />
							</a>

							<a href="#" class="m-all-1">
								<img className="imgFooter" src="./asset/images/icons/icon-pay-03.png" alt="ICON-PAY" />
							</a>

							<a href="#" class="m-all-1">
								<img className="imgFooter" src="./asset/images/icons/icon-pay-04.png" alt="ICON-PAY" />
							</a>

							<a href="#" class="m-all-1">
								<img className="imgFooter" src="./asset/images/icons/icon-pay-05.png" alt="ICON-PAY" />
							</a>
						</div>
						<div class="row">
							<div class="col-lg-12">
								<div class="footer_nav_container">
									<div class="cr">©2018 All Rights Reserverd. Made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="#">Colorlib</a> &amp; distributed by <a href="https://themewagon.com">ThemeWagon</a></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;