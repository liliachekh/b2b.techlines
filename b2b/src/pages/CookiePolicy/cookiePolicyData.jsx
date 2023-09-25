import { Link } from "react-router-dom";
import style from "./cookiePolicy.module.scss";

export const cookiePolicyData = [
  {
    key: "ol1",
    title: <h2 className={style.cookiePolicy__subtitle}>WHAT ARE COOKIES?</h2>,
    text: (
      <p className={style.cookiePolicy__paragraph}>
        Cookies are small files that are downloaded to users' devices
        (computers, mobile phones, tablets, etc.), through their browser, to
        store and retrieve information about the browsing habits of a user or
        their equipment and, depending on the information they contain and the
        way they use their device, to recognize the user.
      </p>
    ),
  },
  {
    key: "ol2",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>
        WHAT TYPE OF COOKIES EXIST?
      </h2>
    ),
    text: (
      <div className={style.cookiePolicy__paragraph}>
        The types of cookies that exist are identified below based on the
        following classification criteria:
        <br />
        <br />
        <ul className={style.cookiePolicy__list}>
          <b>
            Depending on who is the entity that manages the equipment or domain
            from which cookies are sent and treats the data obtained, we can
            distinguish:
          </b>
          <li>
            Own cookies: are those that are sent to the user's terminal
            equipment from a computer or domain managed by the Entity and from
            which the service requested by the user is provided.
          </li>
          <li>
            Third-party cookies: are those that are sent to the user's terminal
            equipment from a computer or domain that is not managed by the
            Entity, but by another entity that processes data obtained through
            cookies.
          </li>
        </ul>
        <br />
        In the event that cookies are sent from a computer or domain managed by
        ALC ZOOM , but the information collected through them is managed by a
        third party, they will not be considered as own cookies if the third
        party uses them for its own purposes (for example, the improvement of
        the services it provides or the provision of advertising services in
        favor of another entity).
        <br />
        <br />
        <ul className={style.cookiePolicy__list}>
          <b>Depending on how long they remain activated on users' devices:</b>
          <li>
            Session cookies: are those designed to collect and store data while
            users access an application or web page. They are usually used to
            store information that is only interested in keeping for the
            provision of a service requested by the user on a single occasion
            and disappear at the end of the session (for example, until you
            close the browser and end the visit).
          </li>
          <li>
            Persistent cookies: are those in which the data is still stored on
            the user's device even when the session has ended and can be
            accessed and processed for a period defined by the person
            responsible for the cookie. This period can range from a few minutes
            to several years, unless the user deletes them manually
          </li>
        </ul>
        <br />
        <br />
        <ul className={style.cookiePolicy__list}>
          <b>
            Depending on the purpose for which the information obtained through
            cookies is processed, which can be:
          </b>
          <li>
            Technical cookies (necessary): are those that allow the user to
            navigate through an application or website and the use of the
            different options or services that exist in them, including those
            that ALC ZOOM uses to allow the management and operation of the
            website and enable its functions and services, such as, for example,
            controlling traffic and data communication, identify the session,
            access restricted access parts, remember the elements that make up
            the products or services, carry out the purchase process of a
            product or service, manage the payment of the same, control fraud
            linked to the security of the service, make the request for
            registration or participation in an event, count visits for the
            purpose of billing licenses of the software with which the service
            works (website, platform or application), use security elements
            during navigation, store content for the dissemination of videos or
            sound, enable dynamic content (for example, animation of loading a
            text or image) or share content through social networks. Also
            belonging to this category, due to their technical nature, are those
            cookies that allow the management, in the most efficient way
            possible, of the advertising spaces that, as another element of
            design or "layout" of the service offered to the user, ALC ZOOM has
            included in the Website based on criteria such as the edited
            content, without the collection of information from users for
            different purposes, such as personalizing that advertising content
            or other content.
          </li>
          <li>
            Analysis or measurement cookies: are those that allow ALC ZOOM to
            monitor and analyze the behavior of users who visit the Website,
            including the quantification of the impacts of advertisements. The
            information collected through this type of cookies is used in the
            measurement of the activity of the Website, in order to introduce
            improvements based on the analysis of the usage data made by the
            users of the service.In accordance with the above and taking into
            account the different types of existing cookies, ALC ZOOM informs
            that this Website does not use cookies to collect information from
            users without previously providing them with the necessary legal
            information and obtaining their express consent for the installation
            of the same on their devices or terminals when necessary (except
            technical / necessary cookies).
          </li>
        </ul>
      </div>
    ),
  },
  {
    key: "ol3",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>
        GENERAL CHARACTERISTICS OF THE COOKIES USED THROUGH THE WEBSITE
      </h2>
    ),
    text: (
      <div className={style.cookiePolicy__paragraph}>
        In accordance with the different types of cookies described above, the
        following are the categories of cookies that can be installed in the
        browser and / or device of users when browsing this Website, depending
        on whether they are their own or those of third parties and their
        purposes. <br />
        <br />
        <ul className={style.cookiePolicy__list}>
          <b>
            Own cookies created or managed by ALC ZOOM and third-party cookies
            managed and managed by service providers contracted by ALC ZOOM :
          </b>
          <li>
            Technical cookies (necessary). <br /> They are those that allow you
            to browse the Website and use the different options or services it
            has. With them, ALC ZOOM can, for example, control traffic and data
            communication, identify users during the session and use security
            elements during users navigation. The technical cookies incorporated
            in this Website are exempt from the obligation to obtain the
            informed consent of users in accordance with current legislation
            since, as indicated, they allow the provision of the service
            requested by the user.
          </li>
          <li>
            Analysis or measurement cookies. <br /> They allow the monitoring
            and analysis of the behavior of the different users on our Website
            to introduce improvements based on the analysis of data on the use
            of products and / or services offered through the Website. The data
            processed to carry out this purpose are anonymized, that is, they do
            not allow the identification of users. In any case, before they are
            installed, the informed consent of the users is required. If the
            user decides not to accept the use of them, some of the
            functionalities of the Website will be limited.
          </li>
        </ul>
        <br />
        <b>
          Third-party cookies created, managed and controlled by third parties
          ALC ZOOM :
        </b>{" "}
        <br />
        It is possible that logos or functions of third-party websites outside
        ALC ZOOM (for example, social networks) may be integrated into the
        Website. <br />
        Sometimes, these features come with scripts or other elements that have
        the ability to read, and sometimes save, cookies on users' browser
        and/or device. These cookies can be of different types (technical or
        necessary that do not require the consent of the users or behavioral
        advertising, in which case, and although ALC ZOOM does not have control
        over them, the consent of the users is previously required before their
        installation). <br />
        Although ALC ZOOM previously requests users' consent to install this
        type of cookies, we inform you that the owner of the same is the one who
        manages their purposes and their own privacy practices. In this regard,
        users should refer to them to obtain more information about the use of
        these cookies and, where appropriate, about the processing of their
        personal data. By way of illustration, but not limitation, so that you
        have more information about it, ALC ZOOM shows below a list of possible
        third parties that may incorporate this type of cookies in the devices
        and / or browsers of the users of the Website, along with the links to
        their cookies policies and privacy policies so that users consult all
        the information in this regard and can continue to decide regarding the
        treatment of their information: <br />
        Google Analytics: <br />
        Privacy Policy and Google Cookies Policy: <br />
        <Link
          to={
            "https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es"
          }>
          {" "}
          https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es
        </Link>
      </div>
    ),
  },
  {
    key: "ol4",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>
        DETAIL OF THE COOKIES USED BY ALC ZOOM THROUGH THE WEBSITE
      </h2>
    ),
    text: (
      <>
        {" "}
        <p className={style.cookiePolicy__paragraph}>
          The following are the cookies and what this Website incorporates
          according to its purposes:
        </p>
        <table>
          <thead>
            <tr>
              <th>Cookie name</th>
              <th>Supplier</th>
              <th>Purpose</th>
              <th>Type of cookie/description</th>
              <th>Expiration/Retention Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OCSESSID</td>
              <td>ALC(Own cookies)</td>
              <td>Ongoing session on the website</td>
              <td>Technical</td>
              <td>For the duration of the session</td>
            </tr>
            <tr>
              <td>Currency</td>
              <td>ALC(Own cookies)</td>
              <td>It saves the currency selected by the user </td>
              <td>Technical</td>
              <td>One month </td>
            </tr>
            <tr>
              <td>Language</td>
              <td>ALC(Own cookies)</td>
              <td>It saves the language selected by the user </td>
              <td>Technical</td>
              <td>One month </td>
            </tr>
            <tr>
              <td>Cookieconsent_status</td>
              <td>ALC(Own cookies)</td>
              <td>It tracks consent to cookie preferences</td>
              <td>Technical</td>
              <td>One year</td>
            </tr>
            <tr>
              <td>Cookieconsent_preferences_disabled</td>
              <td>ALC(Own cookies)</td>
              <td>It tracks consent to cookie preferences</td>
              <td>Technical</td>
              <td>One year</td>
            </tr>
            <tr>
              <td>_gid</td>
              <td>Google Analytics</td>
              <td>Include information</td>
              <td>Analytics</td>
              <td>One day</td>
            </tr>
            <tr>
              <td>_gat_gtag_UA_206722118_1</td>
              <td>Google Analytics</td>
              <td>Include information</td>
              <td>Analytics</td>
              <td>5 minutes</td>
            </tr>
            <tr>
              <td>_ga_XXXXXXX</td>
              <td>Google Analytics</td>
              <td>Include information</td>
              <td>Analytics</td>
              <td>5 minutes</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    key: "ol5",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>
        WAYS TO CHANGE THE SETTINGS OR REVOKE THE CONSENT GIVEN FOR THE
        INSTALLATION OF COOKIES
      </h2>
    ),
    text: (
      <div className={style.cookiePolicy__paragraph}>
        If you have allowed the installation of cookies through the cookie
        management and configuration system used by ALC ZOOM , you can
        subsequently, at any time, delete or change your settings through the
        link "Change your Consent (link to the settings panel)" which is
        included in the previous section "Detail of the cookies used by ALC ZOOM
        through the Website" or use the tools provided by the browser that the
        user has used to access and navigate this Website. If the user decides
        to use the tools provided by his browser, he must bear in mind that,
        depending on the type of browser, the procedure for changing the
        configuration or deleting cookies may vary. By way of illustration, ALC
        ZOOM provides the direct links of the main existing browsers through
        which the user may, at any time, change the configuration or delete the
        cookies on which he has previously given his express consent:
        <ul className={style.cookiePolicy__list}>
          <li>Google Chrome</li>
          <li>Mozilla Firefox</li>
          <li>Internet Explorer</li>
          <li>Microsoft Edge</li>
          <li>MacOS Safari</li>
        </ul>
        The user should bear in mind that some features of the contents of the
        Website are only available if the installation of cookies on their
        devices is allowed. If the user decides not to accept or block certain
        cookies, depending on their purpose, this may affect, totally or
        partially, the normal functioning of the Website or prevent access to
        some services of the same. <br /> However, if the user wishes more
        information on how to revoke the consent given or on the procedure to
        disable cookies, as well as ask any questions about the Cookies Policy
        of the Website, you can contact ALC ZOOM through the following address
        <a href="mailto:atylnyi@techlines.es"> atylnyi@techlines.es</a>
      </div>
    ),
  },
  {
    key: "ol6",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>
        INFORMATION COLLECTED BY THE USE OF COOKIES
      </h2>
    ),
    text: (
      <>
        {" "}
        <div className={style.cookiePolicy__paragraph}>
          When technical (necessary) cookies are installed on your device or
          when users expressly consent to the installation of any other type of
          cookies on their devices, ALC ZOOM may collect a series of data,
          including the following:
          <ul className={style.cookiePolicy__list}>
            <li>
              Technical details about the devices used by users, including:
              connection to the internet and/or other networks (including IP
              address), mobile device identifier, your operating system, browser
              type or other software or data from your computer or other
              technical details.
            </li>
            <li>
              Details of the use of the services of this Website including, but
              not limited to: metric information about when and how users use
              our services, traffic data, geographic location data (city and
              country), the date and time of the last time the user visited our
              website, access to the contents that the user chose on his last
              visit to our Website
            </li>
            <li>
              Data regarding the informed consent expressly given by users for
              the installation of cookies on their devices, including the user's
              consent status as proof of the consent required and given.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    key: "ol7",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>
        PRIVACY REGARDING THE USE OF COOKIES
      </h2>
    ),
    text: (
      <p className={style.cookiePolicy__paragraph}>
        Controller <br /> <br />
        The controller is ALC ZOOM S.L. (hereinafter, also called «ALC ZOOM»).{" "}
        <br />
        Calle Baladre 6, 396, 03570 Villajoyosa <br /> <br />
        To guarantee the proper management in the processing of your data, ALC
        ZOOM may contact the electronic address{" "}
        <a href="mailto:atylnyi@techlines.es">
          {" "}
          atylnyi@techlines.es
        </a> <br /> <br />
        Purposes of the processing and legal basis <br />
        The purposes of the treatment are indicated in "General characteristics
        of the cookies used through the Website" and in "Detail of the cookies
        used by ALC ZOOM through the Website". The legal basis of the treatment
        is the informed consent expressly given by the users, who at any time
        can manage and revoke it as described in "Ways to change the settings or
        revoke the consent given for the installation of cookies".
      </p>
    ),
  },
  {
    key: "ol8",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>Recipients of the data</h2>
    ),
    text: (
      <div className={style.cookiePolicy__paragraph}>
        ALC ZOOM may share the information collected with:
        <ul className={style.cookiePolicy__list}>
          <li>
            If necessary with the competent authorities and public bodies,
            Judges, Courts and Public Prosecutor's Office for the fulfillment of
            the legal obligations that are applicable to ALC ZOOM in accordance
            with European Union Law and / or applicable domestic legal regime.
          </li>
          <li>
            Service providers acting on behalf of and on behalf of ALC ZOOM as
            data processors, following their instructions at all times. By way
            of illustration, these providers may offer analysis and measurement
            services, advertising personalization, technical services for the
            operation of the Website, services so that users can manage their
            consent, etc.
          </li>
          <li>
            Third parties outside ALC ZOOM that install cookies from their own
            domains or from the domains of ALC ZOOM when it is said third
            parties who administer and manage the purposes of said cookies and
            the information they collect as a result. These third parties may
            be, among others, the owners of the main social networks (Twitter,
            Facebook, Instagram or YouTube) or Google.
          </li>
        </ul>
      </div>
    ),
  },
  {
    key: "ol9",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>
        Transfers to third countries
      </h2>
    ),
    text: (
      <p className={style.cookiePolicy__paragraph}>
        The processing of the data is carried out, in general, within the
        European Economic Area or in countries that have been declared with an
        adequate level of protection. <br /> Notwithstanding the foregoing, the
        Website has third-party cookies that provide services to ALC ZOOM and
        that can store and access the information they collect even outside the
        EEA:
        <br />
        Cookies de Google:
        <br />
        The Website uses certain services provided and developed by Google,
        Inc., a Delaware company whose main office is at 1600 Amphitheatre
        Parkway, Mountain View (California), CA 94043, United States ("Google"),
        which use cookies. These services include:
        <br /> Google Analytics, an analysis tool that allows RALC ZOOM to
        understand how users who visit its website interact, offering them
        statistics on the use of the Website without users necessarily having to
        be identified (anonymized IP). Users can consult all the information on
        how Google Analytics uses cookies and the information it collects
        through the following link:
        <br />
        <Link
          to={
            "https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es"
          }>
          https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es
        </Link>
      </p>
    ),
  },
  {
    key: "ol10",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>Data retention period</h2>
    ),
    text: (
      <p className={style.cookiePolicy__paragraph}>
        The data will be processed as long as the authorizations of use granted
        by the users remain in force. Next, and in accordance with the data
        protection regulations, these data will be kept duly blocked (during the
        limitation period of the actions derived from said authorization) for
        the sole purpose of complying with the legal obligations required of ALC
        ZOOM and for the formulation, exercise or defense of claims.
      </p>
    ),
  },
  {
    key: "ol11",
    title: <h2 className={style.cookiePolicy__subtitle}>Exercise of rights</h2>,
    text: (
      <div className={style.cookiePolicy__paragraph}>
        Users can at any time manage or revoke the consent granted as described
        in the section "Ways to change the settings or revoke the consent given
        for the installation of cookies".
        <br />
        Likewise, they can also exercise at any time their right of access,
        rectification, deletion, opposition, limitation, portability, withdraw
        their consent and not be subject to automated individual decisions,
        including the elaboration of profiles, by sending their request in
        writing to the Data Protection Officer of ALC ZOOM to the following
        addresses:
        <ul className={style.cookiePolicy__list}>
          <li>
            Postal mail: C / Baladre 6, 396 – Villajoyosa, Alicante, 03570
          </li>
          <li>
            Email:{" "}
            <a href="mailto:atylnyi@techlines.es">atylnyi@techlines.es</a>
          </li>
        </ul>
        In both cases, the user must attach to their request a copy of their ID,
        NIF or official document that identifies them.
        <br />
        Users also have the right to file a claim when they deem it appropriate
        to safeguard their rights before the Spanish Agency for Data Protection
        (<Link to={"www.aepd.es"}>www.aepd.es</Link>).
      </div>
    ),
  },
  {
    key: "ol12",
    title: (
      <h2 className={style.cookiePolicy__subtitle}>
        Update of the cookies and contact policy
      </h2>
    ),
    text: (
      <p className={style.cookiePolicy__paragraph}>
        This Cookies Policy may vary depending on the cookies used by this
        Website.
        <br />
        ALC ZOOM recommends that users review this Policy each time they access
        the Website in order to be adequately informed about how and why we use
        cookies so that they can be aware of any changes that occur on the type
        of data that is collected and the purpose for which they are collected,
        without prejudice to the prior collection in cases where it is
        necessary, your express informed consent.
        <br />
        Villajoyosa, 18 september 2023.
      </p>
    ),
  },
];
