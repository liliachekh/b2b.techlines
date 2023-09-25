import { Link } from "react-router-dom";
import style from "./privacyPolicy.module.scss";

export const privacyPolicyData = [
  {
    key: "ol1",
    title: (
      <h2 className={style.privacyPolicy__subtitle}>
        Applicable regulations on privacy and data protection
      </h2>
    ),
    text: (
      <p className={style.privacyPolicy__paragraph}>
        ALC ZOOM S.L. aware of the importance of guaranteeing the fundamental
        right to the protection of personal data of users and, in this sense, in
        compliance with the provisions of Regulation (EU) 2016/679 of the
        European Parliament and of the Council, of April 27, 2016, regarding the
        protection of natural persons with regard to the processing of personal
        data and the free movement of these data (RGPD), as well as Organic Law
        3/2018, of December 5, Protection of Personal Data and guarantee of
        digital rights (LOPDGDD), informs below of the privacy policy that
        governs the website
        <Link
          to="https://techlines.es"
          target="blank">
          {" "}
          https://techlines.es
        </Link>
      </p>
    ),
  },
  {
    key: "ol2",
    title: (
      <h2 className={style.privacyPolicy__subtitle}>
        Identification of the data controller
      </h2>
    ),
    text: (
      <p className={style.privacyPolicy__paragraph}>
        The person responsible for the processing of personal data collected
        through the Website is ALC ZOOM S.L. (here in after, ALC ZOOM), with
        N.I.F. ESB-72884349 and registered office at Calle Baladre 6, 396 CP:
        03570, Villajoyosa. For any question related to data protection, the
        user can contact the entity through the following email address:
        <a href="mailto:atylnyi@techlines.es">atylnyi@techlines.es</a>
      </p>
    ),
  },
  {
    key: "ol3",
    title: (
      <h2 className={style.privacyPolicy__subtitle}>
        What kind of personal information do we collect?
      </h2>
    ),
    text: (
      <>
        {" "}
        <div className={style.privacyPolicy__paragraph}>
          ALC ZOOM may collect the following personal information from users
          through the forms enabled on the Website or the communication channels
          enabled by ALC ZOOM:
          <ol className={style.privacyPolicy__list}>
            <li key={1}>
              <strong>Form for registering users on the Website:</strong> name,
              surname, email address, telephone, date of birth, signature,
              address and, where appropriate, ID.
            </li>
            <li key={2}>
              <strong>
                Contact form or through any of the means of contact enabled:
              </strong>{" "}
              name, surname, email, and where appropriate, mobile phone.
            </li>
            <li key={3}>
              <strong>
                Subscription and / or registration to receive commercial
                communications:
              </strong>{" "}
              name, surname and email address.
            </li>
            <li key={4}>
              <strong>
                Management of purchases made by the user on the Website:
              </strong>{" "}
              name, surname, postal address, email address, telephone number and
              bank details.
            </li>
            <li key={5}>
              <strong>Processing of the return of products:</strong> name,
              surname, email, telephone, company, address.
            </li>
          </ol>
          In addition, ALC ZOOM collects all information related to browsing the
          web, as reported in our cookies and bank details policy.
        </div>
      </>
    ),
  },
  {
    key: "ol4",
    title: (
      <h2 className={style.privacyPolicy__subtitle}>
        Purposes of the treatment, legitimizing bases and conservation period.
      </h2>
    ),
    text: (
      <>
        {" "}
        <p className={style.privacyPolicy__paragraph}>
          Depending on the different forms, services or content accessed by the
          user, the data may be processed for the following purposes:
        </p>
        <table>
          <thead>
            <tr>
              <th>PURPOSE</th>
              <th>LEGITIMIZING BASIS</th>
              <th>STORAGE PERIOD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Enable the operation of the Website,</b> thereby allowing the
                user access to the information and content provided therein.
              </td>
              <td>
                Consent of the user and, as the case may be, satisfaction of the
                legitimate interest, own or of third parties, associated with
                the proper management, maintenance, development and evolution of
                the platform, tools, network and associated information systems,
                allowing its correct functioning, functionalities, access to
                content and services, as well as the general security of all the
                previous extremes.
              </td>
              <td>
                In general, the data will be kept for these purposes for the
                essential and necessary time to enable the correct navigation
                and use of our Website and the contents available through it to
                which you access. Regarding the data associated with the
                browsing profile, in relation to the analytical cookies that,
                where appropriate, you have accepted as indicated in our cookies
                policy, you must attend to the section related to the
                temporality of the same (see{" "}
                <Link
                  to="/cookies-policy"
                  target="blank">
                  cookies policy
                </Link>
                ).
              </td>
            </tr>
            <tr>
              <td>
                <b>Management of the contractual relationship with clients:</b>
                The information you provide us during the purchase process will
                be used to correctly process the purchase of the product and /
                or contracting the service, as well as to manage the effective
                payment of the product or service purchased, process the
                shipment, manage any incident related to the purchase process.
              </td>
              <td>
                Execution of the contractual relationship between the parties,
                in the terms provided in article 6.1.b of the RGPD. The personal
                data of customers will be processed while the contract of sale
                of product or contracting of service signed with the client must
                be executed.
              </td>
              <td>
                The information of the Registered Users will be kept
                indefinitely unless the User requests the cancellation as a
                Registered User. Subsequently, they will be kept duly blocked
                during the limitation period of legal actions and after that
                period they will be deleted.
              </td>
            </tr>
            <tr>
              <td>
                <b>Management of the relationship with registered users:</b> The
                information you provide us in the registration process will be
                used for the management of Users of the website, so that you can
                create your user account on the web, access your profile,
                consult your orders and make your purchases without having to
                enter your identification data again (name, surname, email and
                telephone and ID, if applicable) and delivery address.
              </td>
              <td>
                Execution of the contractual relationship between the parties,
                in the terms provided in article 6.1.b of the RGPD. Legitimate
                interest of ALC ZOOM in simplifying the purchase process through
                the automatic inclusion of customer data in the purchase form,
                in the terms provided in article 6.1.f of the RGPD
              </td>
              <td>
                The information of registered users will be kept{" "}
                <b>
                  indefinitely unless the User requests the cancellation as a
                </b>{" "}
                registered user. Subsequently, they will be kept duly blocked
                during the limitation period of legal actions and after that
                period they will be deleted.
              </td>
            </tr>
            <tr>
              <td>
                <b>
                  Respond to requests or requests sent through the contact form
                  and / or any other means of contact
                </b>
                The personal data that you provide us through the contact form
                and / or any means of contact enabled on the Website, will be
                treated only to answer your query or request. The information
                collected is limited to identification and contact data, as well
                as data related to the nature of the request you send us.
              </td>
              <td>
                The user's consent (article 6.1 a of the RGPD) and, as the case
                may be, execution of pre-contractual measures or the contractual
                relationship between the parties, in the terms provided for in
                article 6.1.b of the RGPD.
              </td>
              <td>
                The information collected through the form will be used for the
                period necessary to respond to the query or request for
                information Specifically, the data will be deleted, unless the
                nature of the query or request requires the conservation of your
                information for other purposes, in which case we will inform
                about said purpose of the treatment, the term of conservation
                and recipients of data, in the corresponding terms.
              </td>
            </tr>
            <tr>
              <td>
                <b>Sending newsletter and commercial communications</b>
                We will use your identification and contact information to send
                you information about the news of the Website, as well as our
                products and services. This information may be sent
                electronically (email).
              </td>
              <td>
                In the case of users who have signed a contract with ALC ZOOM,
                the legitimizing basis will be the legitimate interest of ALC
                ZOOM to carry out promotional activities through the sending of
                its own commercial communications related to products and
                services aimed at its customers, as recognized in article 21.2
                of the LSSI. In the event that the user has not signed a
                contract with ALC ZOOM, the latter may process their data for
                this purpose provided that the user has given their consent
                (article 6.1 a of the RGPD). In any case, you can request the
                cancellation of the receipt of commercial communications at any
                time and at no cost, through the following channels: - By
                sending an email requesting it to the address{" "}
                <a href="mailto:atylnyi@techlines.es">atylnyi@techlines.es</a>{" "}
                <br />- Following the instructions at the bottom of the body of
                each electronic communication you receive.
              </td>
              <td>
                The information of the recipients will be kept indefinitely
                unless the User requests the cancellation of the receipt of new
                communications. Subsequently, they will be kept duly blocked
                during the limitation period of legal actions, remaining
                available only to the competent authorities, always in
                accordance with the applicable regulations. Once this period has
                elapsed, the deletion will be carried out.
              </td>
            </tr>
            <tr>
              <td>
                <b>
                  Transfer of data to the tax administration or other public
                  bodies
                </b>{" "}
                within the framework of compliance with obligations arising from
                accounting, tax, consumption, etc. regulations. In these cases,
                your refusal to provide us with personal data that is legally
                mandatory will imply the impossibility for you to contract
                products or services with ALC ZOOM, since doing so would entail
                a breach of the regulations to which we are subject.
              </td>
              <td>
                Compliance with legal obligations arising from accounting, tax,
                consumption, etc. regulations in the terms provided in article
                6.1.c of the RGPD.
              </td>
              <td>Not applicable</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    key: "ol5",
    title: (
      <h2 className={style.privacyPolicy__subtitle}>
        Veracity of the information provided
      </h2>
    ),
    text: (
      <p className={style.privacyPolicy__paragraph}>
        All information provided by the user must be truthful and accurate. For
        these purposes, the user guarantees the authenticity of all data
        provided as a result of completing the corresponding forms and / or
        requests. In any case, the user will be solely responsible for any false
        or inaccurate statements made, and for the damages caused to ALC ZOOM,
        or to third parties, for the information provided.
      </p>
    ),
  },
  {
    key: "ol6",
    title: (
      <h2 className={style.privacyPolicy__subtitle}>
        Recipients of the data and international transfers
      </h2>
    ),
    text: (
      <>
        {" "}
        <div className={style.privacyPolicy__paragraph}>
          We inform the user that the information collected through the Website
          may be transferred to the following recipients:
          <ul>
            <li key={"ul1"}>
              Trust service providers that can access personal information in
              the development of the services they may provide to ALC ZOOM under
              their control and to the extent strictly necessary for the
              provision of the services contracted with them (for example,
              courier companies, computer scientists in charge of hosting and /
              or maintenance of the Website).
            </li>
            <li key={"ul2"}>
              Where appropriate, to other companies in the framework of actions
              and preparatory acts of review prior to commercial operations of
              any nature, such as merger, spin-off, global transfer of assets
              and liabilities, contribution or transfer of business or branch of
              business activity, or any corporate restructuring operation and /
              or business of a similar nature contemplated in commercial
              regulations, based on our legitimate interest in continuing the
              provision of our services.
            </li>
            <li key={"ul3"}>
              To third parties to whom they are legally obliged to transfer the
              data, such as Public Bodies and Authorities, the Tax Agency, the
              Courts and Tribunals or the State Security Forces and Bodies.
            </li>
          </ul>
          Likewise, we inform the user that, although in general international
          data transfers are avoided, sometimes it cannot be avoided or is
          strictly necessary for the proper functioning of the Website. In case
          of international data transfers, the organizational, technical and
          contractual measures necessary to guarantee the protection and
          security of personal data will be adopted (for example, the
          subscription of Standard Contractual Clauses). Notwithstanding the
          foregoing, in the case of information obtained through certain
          cookies, international data transfers may be made (for more
          information, see our{" "}
          <Link
            to="/cookies-policy"
            target="blank">
            cookies policy
          </Link>
          ).
        </div>
      </>
    ),
  },
  {
    key: "ol7",
    title: (
      <h2 className={style.privacyPolicy__subtitle}>Exercise of rights</h2>
    ),
    text: (
      <p className={style.privacyPolicy__paragraph}>
        The user has the right to withdraw the consent given, to access their
        personal data, as well as to request the rectification of inaccurate
        data or, where appropriate, request its deletion when, among other
        reasons, the data is no longer necessary for the purposes that were
        collected. In certain circumstances and for reasons related to their
        particular situation, the user may object to the processing of their
        data (for example and in particular, to the sending of commercial
        communications). In this case, ALC ZOOM will stop processing the data,
        except for legitimate reasons (such as the exercise or defense against
        possible claims). Finally, we inform you about your right to restriction
        of processing and portability provided for in the GDPR. To make these
        rights effective, the user can send an email to the email address{" "}
        <a href="mailto:atylnyi@techlines.es">atylnyi@techlines.es</a> or send a
        letter to the following address: Calle Baladre 6, 396 CP: 03570,
        Villajoyosa. In the event that the User does not see his right satisfied
        or considers that the data processing does not comply with the
        applicable regulations, he can file a claim with the control authority,
        in this case the Spanish Agency for Data Protection (
        <Link to="www.aepd.es">www.aepd.es</Link>). In case you do not want to
        exercise a specific right, but you need to make a query or suggestion in
        relation to the processing of your personal data, you can also go to the
        address provided in section 2 of this policy.
      </p>
    ),
  },
  {
    key: "ol8",
    title: <h2 className={style.privacyPolicy__subtitle}>Social Network</h2>,
    text: (
      <p className={style.privacyPolicy__paragraph}>
        ALC ZOOM has a profile in some of the main social networks on the
        Internet (Facebook, LinkedIn). Therefore, in the event that users have a
        profile on any of these social networks and contact ALC ZOOM by this
        means or in any other way interact with ALC ZOOM in this way, the
        personal data provided by the user, and those that are visible as a user
        of the corresponding social network, will be treated by ALC ZOOM, in the
        social network itself, to respond to such requests through the channels
        of the corresponding social network, applying this privacy policy for
        these purposes. In particular, the personal data that, where
        appropriate, the user provides us through the aforementioned social
        networks will be processed only to answer your query or request. The
        information collected will generally be limited to identification and
        contact data, as well as data related to the nature of the request you
        send us.
        <br />
        The user has the right to exercise their rights, as explained in this
        privacy policy. However, the exercise of these rights will be defined by
        the functionalities of the corresponding social network, and these
        rights may be exercised only in relation to that information that is
        under the control of ALC ZOOM.  In no case will ALC ZOOM extract data
        from social networks, unless the user's consent is obtained punctually
        and expressly for it.
      </p>
    ),
  },
  {
    key: "ol9",
    title: (
      <h2 className={style.privacyPolicy__subtitle}>
        Changes to this Privacy Policy
      </h2>
    ),
    text: (
      <p className={style.privacyPolicy__paragraph}>
        ALC ZOOM reserves the right to modify this Privacy Policy to adapt it to
        new legislation or jurisprudence, as well as industry and/or sector
        practices. In such cases, ALC ZOOM will announce on this page the
        changes introduced with reasonable anticipation.
      </p>
    ),
  },
];
