import { Link } from "react-router-dom";
import style from "./termsAndConditions.module.scss";
import { DeliveryList } from "../../components/DeliveryList";

export const termsAndConditionsData = [
  {
    key: "ul1",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>
        INTRODUCTION. OUR DATA
      </h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        The purpose of these terms and conditions is to regulate the use of the
        electronic sales services of different products offered by ALC ZOOM S.L.
        (ALC ZOOM), is a Spanish company operating through its website
        <Link to={"https://techlines.es"}> https://techlines.es</Link> and
        telephone
        <a href="tel:+34627575578"> +34 627 575 578</a>, selling to its
        customers, technological products, electronics, telephones, smartphones,
        multimedia systems, audio and video players, etc., for subsequent resale
        to third parties (“End Customers”). ALC ZOOM can provide drop-shipping
        services to its customers. Once the sale of the product to the client
        has taken place, and following communication by the latter of the
        necessary details of the End Client, the service consists of the
        management of the transport and delivery of the products by ALC ZOOM to
        the client at the facilities of its End Customers. ALC ZOOM is a company
        registered in the Commercial Register of Alicante in volume 4525, folio
        134, Sheet A-1882745 with Tax Identification Number (NIF) B-72884349. By
        placing an order, the customer accepts these terms and conditions of
        sale, which are available to view in the ALC ZOOM online shop at all
        times. Please read these terms and conditions carefully.
      </p>
    ),
  },
  {
    key: "ul2",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>
        PRODUCTS AND ORDERS
      </h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        The products available at ALC ZOOM are those shown in the catalogue on
        the website. Products, stock and prices are updated regularly. Orders
        are placed on-line through the ALC ZOOM website, indicating the products
        and the quantity requested, as well as the recipient of the goods at the
        destination (the client or the End Customer) of the products and the
        point of delivery of the same. The ALC ZOOM team undertakes to process
        all orders as soon as possible during opening hours. Once an order has
        been processed, you will receive an email with the order confirmation.
        Please always check the document received. ALC ZOOM reserves the right
        to adjust the shipping cost according to our shipping policy.
      </p>
    ),
  },
  {
    key: "ul3",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>PRICES AND PAYMENT</h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        The prices shown on the website do not include taxes and fees; likewise,
        they also exclude potential transport costs.The prices applied to
        domestic customers will include the corresponding Value Added Tax
        (“VAT”) while such tax will not apply to domestic customers with a SAD,
        international customers and customers outside the EU. VAT will not be
        applied to domestic customers who present the corresponding Reseller
        Certificate for exempt product categories, in accordance with Article 84
        of the VAT Act. Once an order has been placed, the confirmed prices
        cannot be changed under any circumstances. ALC ZOOM reserves the right
        to cancel the order, in the event that, due to an error, a wrong price
        is published with a difference of more than 10% of the correct price,
        informing the customer within 24 hours of placing the order or,
        alternatively, informing the customer of the correct price within this
        period, in which case, confirmation by the customer will be necessary.
        If an item ordered is not in stock at the time of ordering, we will
        contact you by telephone or email to arrange how to proceed. ALC ZOOM
        only accepts payments by: <br /> a) Bank transfer, in which case it can
        be in advance, on delivery or up to 60 days without any interest; *{" "}
        <br /> b) Debit or credit card;
        <br /> c) Reimbursement of 2% of the purchase value at national and
        international level with a minimum of €10. In national territory payment
        in cash up to €999,99 and by cheque up to €2,499.99. Other payments in
        cash up to €1,999.99 (for cheque payments please consult the policy of
        each country). ALC ZOOM reserves the right to sell only to companies
        with a Spanish Tax Identification Number or with an active VIES
        (Europe).The documents are to be provided at the time of registration as
        a customer and will be updated on an annual basis.
        <br /> <br />
        *Contact your sales representative to ask about the different payment
        options.
      </p>
    ),
  },
  {
    key: "ul4",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>PAYMENT SECURITY</h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        ALC ZOOM encrypts all your card details using the SSL (Secure Socket
        Layer) protocol, so no unauthorised person can read your card number or
        other information during a transaction.
      </p>
    ),
  },
  {
    key: "ul5",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>OPENING HOURS</h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        You can order online at any time of the day. ALC ZOOM staff process
        orders on working days (Monday to Friday from 9:30 am to 17:30 pm).
        Orders placed outside these hours will be processed on the next working
        day
      </p>
    ),
  },
  {
    key: "ul6",
    title: <h2 className={style.termsAndConditions__subtitle}>DELIVERY</h2>,
    text: (
      <div className={style.termsAndConditions__paragraph}>
        The products will be delivered, at the customer's request, at the time
        of placing the order:
        <ul className={style.termsAndConditions__sublist}>
          <li key={"ul_1"}>
            At the customer's premises, tax domicile or legal domicile, as
            stated in the tax documentation provided.
          </li>
          <li key={"ul_2"}>
            At the customer's facilities contracted with a storage and/or
            logistics service. In this case, the Client must provide ALC ZOOM
            with the necessary details of the location of these warehouses, as
            well as any documentation that justifies the existence of an
            agreement regulating this logistics service between these facilities
            and the Client.
          </li>
          <li key={"ul_3"}>
            At the facilities of the End Customers, provided that these
            facilities are located within the European Union, in which case ALC
            ZOOM will take care of the neutral packaging, transport and delivery
            of the products to the client at the facilities of the End Customer
            (drop-shipping). In this case, the client must obtain the necessary
            data from the End Customer, as well as the corresponding
            authorisation for the transfer of the same to ALC ZOOM in order to
            manage the transport and delivery of the products to the End
            Customer. For this purpose, such access to personal data of End
            Customers, owned by the client, shall be regulated in accordance
            with thedata protection regulations applicable at any given time.
            ALC ZOOM manages the delivery through the following courier
            companies: UPS, DHL, MRW, CORREOS EXPRESS, TSB and SCHENKER. Once
            the client has chosen between express or standard service, the type
            of transport will be selected for their order at their convenience,
            based on volume and destination, always taking into account the
            quality of the service. If you have any special transport
            requirements, please indicate them before confirming your order. We
            insure all deliveries against damage and loss while in transit from
            ALC ZOOM to the recipient's address. As soon as the delivery has
            been received at the agreed address and the delivery note has been
            signed, the goods will no longer be covered by our insurance. <br />{" "}
            For the correct processing of possible incidents, you must request a
            review to the carrier at the time of delivery if you notice visible
            damage, missing products or for your safety always seal/write
            "pending review" for possible hidden damage (no broken or damaged
            packaging), then you will have to contact your sales consultant or
            you can use the email: sat@ribamundotecnologia.es, indicating what
            happened and in case of theft or loss of product you must give us
            the IMEI or SERIAL NUMBER of the product. ALC ZOOM cannot be held
            responsible for delays in deliveries due to problems with logistics
            companies or their carriers, both national and international. If you
            have any further questions, please do not hesitate to contact us.
          </li>
        </ul>
      </div>
    ),
  },
  {
    key: "ul7",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>SHIPPING COSTS</h2>
    ),
    text: (
      <div className={style.termsAndConditions__paragraph}>
        <DeliveryList />
      </div>
    ),
  },
  {
    key: "ul8",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>
        WITHDRAWAL AND RETURN PERIOD
      </h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        The customer has the right to cancel any purchase made in the ALC ZOOM
        online shop before the shipment of the order, otherwise the customer
        will have to pay the shipping costs. Orders placed specifically at the
        express request of the customer may not be cancelled..In order to
        proceed with the cancellation, it is not sufficient not to accept the
        delivery of the package, as it must be notified in writing via email,
        WhatsApp or the means of contact that has been used with your account
        manager.
        <br />
        If you wish to return your order, the withdrawal period expires 14
        calendar days after the date of receipt of the goods; in no case will we
        bear the associated shipping costs.
        <br />
        To proceed with the return during the withdrawal period, you must notify
        us by email at
        <a href="mailto:atylnyi@techlines.es"> atylnyi@techlines.es</a>, so that
        you can be provided with an RMA number which you must use to mark the
        return package.
        <br />
        We must specify that you can return all the products or only one or more
        items of your purchase, in no case we will accept the return of
        merchandise that has been manipulated: degraded, damaged or that does
        not have its factory seals.
        <br />
        The customer is responsible for ensuring that the goods are correctly
        packaged during the return shipment. The customer must take into account
        that in the event of any incident with the transport company, the
        customer will be responsible for the same: loss, theft or breakage.
        <br />
        Please note that we do not accept cash on delivery parcels.
        <br />
        <br />
        For this purpose, the return address is as follows:
        <br />
        <br />
        ALC ZOOM, S.L.
        <br />
        Calle Baladre 6, 396
        <br />
        03570 Villajoyosa
        <br />
        A/A of: Returns/SAT
        <br />
        <br />
        Once the product has been checked and approved by the corresponding
        department, we will proceed to make the refund using the same means of
        payment used, within a maximum period of thirty (30) working days after
        receiving the goodsthat you wish to return to the ALC ZOOM S.L.
        facilities.
      </p>
    ),
  },
  {
    key: "ul9",
    title: <h2 className={style.termsAndConditions__subtitle}>GUARANTEE</h2>,
    text: (
      <p className={style.termsAndConditions__paragraph}>
        All products sold by ALC ZOOM are covered by a 30-day guarantee managed
        directly with us from the moment of sale to the end customer. This
        guarantee is valid for twelve (12) months from the moment of purchase of
        the article, once it has been invoiced. Independently, the products are
        guaranteed by the brand as required by law.
        <br />
        <br />
        In order to proceed with the return during the warranty period, you must
        notify us by email at
        <a href="mailto:atylnyi@techlines.es"> atylnyi@techlines.es</a>{" "}
        indicating all the details of the case.
      </p>
    ),
  },
  {
    key: "ul10",
    title: <h2 className={style.termsAndConditions__subtitle}>DOA</h2>,
    text: (
      <p className={style.termsAndConditions__paragraph}>
        DOA, “Dead on Arrival” means that if a product arrives in a defective
        state, the product is opened, provided that the defect has been detected
        within fifteen (15) days after the sale to the end customer. In this
        case, you must notify us by email to the following address
        <a href="mailto:atylnyi@techlines.es"> atylnyi@techlines.es</a>,
        indicating all the details of the case and also specifying that it is a
        DOA. Exchanges will only be accepted for DOA "Manufacturer's Defect" by
        presenting us with the invoice of the same article corresponding to your
        end customer or, failing that, the sales receipt, to prove that it is
        within the deadline.
        <br />
        <br />
        The DOA will be accepted as long as the product is delivered with all
        its accessories, and the defect must not be the result of improper use
        of the product or other actions that have resulted in damage.
        <br />
        <br />
        Any type of return (according to the three points mentioned above) must
        be accepted by our corresponding department after assessing the case,
        which reserves the right to request any additional information relevant
        to managing the return properly.
      </p>
    ),
  },
  {
    key: "ul11",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>
        DATA PROTECTION CLAUSE
      </h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        PROTECTION OF PERSONAL DATA - The personal data you provide will be
        processed by ALC ZOOM S.A., with registered office at ALC ZOOM,
        S.L.Calle Baladre 6, 396, 03570 Villajoyosa A/A of: Returns/SAT and CIF
        B-72884349, with the aim of managing the contractual relationship in
        force between the parties
        <br />
        <br />
        The legal basis for the processing is the performance of a contract to
        which the data subject is a party or for the implementation of
        pre-contractual measures at the request of the data subject, so that
        failure to provide personal data could result in the impossibility of
        the performance of the relationship between the two parties.
        <br />
        <br />
        Personal data will be kept for the time necessary to correctly deal with
        your specific requests and/or requests and, in particular, to give due
        satisfaction to such pre-contractual measures and/or contract between
        the parties. When they are no longer necessary, they will be kept for as
        long as we are obliged to keep them in compliance with a legal
        obligation and/or for the fulfilment of possible liabilities arising
        from the processing. In general, we do not share personal data with
        third parties, except as required by law.
        <br />
        <br />
        At any time, you may exercise your rights of access, rectification,
        erasure, objection and limitation of processing and portability of your
        personal data, as well as the right not to be subject to a decision
        based solely on automated processing (including profiling), in
        accordance with the General Data Protection Regulation, by writing to
        ALC ZOOM, at the postal address indicated in this contract In
        particular, you are informed of your right to file a complaint with the
        Spanish Data Protection Agency (www.aepd.es) if you consider that the
        processing does not comply with the regulations in force or if you have
        not obtained satisfaction in the exercise of your
      </p>
    ),
  },
  {
    key: "ul12",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>
        MODIFICATIONS TO THESE TERMS AND CONDITIONS
      </h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        The rapid development of the internet may make it necessary to make
        changes to our terms and conditions. Therefore, ALC ZOOM reserves the
        right to update and modify the terms and conditions. In doing so, we
        will also change the "last modified" date at the end of the document.
        Significant changes will be published on the ALC ZOOM website.
      </p>
    ),
  },
  {
    key: "ul13",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>
        CONTACT INFORMATION
      </h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        We are happy to answer any of your questions about these terms and
        conditions or other aspects of our service. Please contact our customer
        service at:
        <br />
        Tel.: +34 627 575 578
        <br />
        Email: atylnyi@techlines.es
      </p>
    )
  },
  {
    key: "ul14",
    title: (
      <h2 className={style.termsAndConditions__subtitle}>
        JURISDICTION AND APPLICABLE LAW
      </h2>
    ),
    text: (
      <p className={style.termsAndConditions__paragraph}>
        Spanish law shall apply.
        <br />
        Any dispute or controversy shall be submitted to the courts and
        tribunals of Alicante.
      </p>
    ),
  },
];
