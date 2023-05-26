import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function ContactBar() {
  return (
    <div className="contact-bar">
        <a id="twitter" className="contact" target="_blank" rel="noreferrer" href="https://twitter.com/cuan_codes/">
          <FontAwesomeIcon className="fab" icon={faTwitter} />
        </a>
        <a id="github" className="contact" target="_blank" rel="noreferrer" href="https://github.com/matthewcuan/">
          <FontAwesomeIcon className="fab" icon={faGithub} />
        </a>
        <a id="linkedin" className="contact" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/matthew-cuan/">
          <FontAwesomeIcon className="fab" icon={faLinkedin} />
        </a>
        <a className="contact" target="_blank" href="mailto:cuanmatthewl@gmail.com">
          <FontAwesomeIcon className="fab" icon={faEnvelope} />
        </a>      
    </div>
  )
}

export default ContactBar