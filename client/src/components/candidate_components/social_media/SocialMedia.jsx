import "./socialMedia.css";
import { Facebook, Instagram, Twitter, YouTube } from "@material-ui/icons";

function SocialMedia() {
  return (
    <div className="social-media-parent  list-unstyled  col-md-9 ">
      <h5>check me on:</h5>
      <li>
        <Facebook className="social-media-icon f" /> <span>Abu-Lujain</span>{" "}
        <span>300k</span>
      </li>
      <li>
        <YouTube className="social-media-icon y" />
        <span>Abu-Lujain</span> <span>300k</span>
      </li>
      <li>
        <Twitter className="social-media-icon t" />
        <span>Abu-Lujain</span> <span>40k</span>
      </li>
      <li>
        <Instagram className="social-media-icon tel" />
        <span>Abu-Lujain</span> <span>134k</span>
      </li>
    </div>
  );
}

export default SocialMedia;
