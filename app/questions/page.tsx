import {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger
  } from "@/components/ui/accordion"
  
export default function questions() {
    return (
      <>
      <h1 className='flex flex-wrap gap-2 mb-10 sm:gap-x-6 items-center justify-center text-2xl font-bold leading-none tracking-wide sm:text-5xl'>
        Frequently asked
        <span className='bg-primary py-2 px-4 rounded-lg tracking-widest text-white'>
          questions
        </span>
      </h1>
      <Accordion type="single" collapsible className="m-auto w-[800px] text-2xl">
          <AccordionItem value="item 1" >
            <AccordionTrigger className="text-base capitalize">What is Campusly?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
              Campusly is an online marketplace designed for university students in Budapest, allowing them to easily buy, sell, and exchange items within their campus community.
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item 2" >
            <AccordionTrigger className="text-base capitalize">Who can use Campusly?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                Campusly is exclusively for students attending universities in Budapest. You must register using a valid student email to join the platform.
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item 3" >
            <AccordionTrigger className="text-base capitalize">How do I sign up for Campusly?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                  Simply click on the "Register" button and register using your university email address. Once verified, you can start buying, selling, and browsing items.
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item 4" >
            <AccordionTrigger className="text-base capitalize">How do transactions work on Campusly?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                  All transactions are handled directly between buyers and sellers. Campusly provides a secure platform to connect students, but payments and exchanges are made in person or using preferred methods between the two parties.
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item 5" >
            <AccordionTrigger className="text-base capitalize">What items can I sell on Campusly?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                You can sell textbooks, electronics, clothing, furniture, and other items that may be useful for fellow students. Make sure your items are legal and safe to sell.
              </AccordionContent>
          </AccordionItem>


          <AccordionItem value="item 6" >
            <AccordionTrigger className="text-base capitalize">How do transactions work on Campusly?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                  All transactions are handled directly between buyers and sellers. Campusly provides a secure platform to connect students, but payments and exchanges are made in person or using preferred methods between the two parties.
              </AccordionContent>
          </AccordionItem>


          <AccordionItem value="item 7" >
            <AccordionTrigger className="text-base capitalize">Can I offer services on Campusly?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                  Yes, in addition to items, you can offer services like tutoring, transportation, or cleaning. Simply list your service with a description and rate.
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item 8" >
            <AccordionTrigger className="text-base capitalize">Can I leave reviews for buyers or sellers?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                  Yes, after completing a transaction, both buyers and sellers can leave reviews to help build trust within the Campusly community.
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item 9" >
            <AccordionTrigger className="text-base capitalize">Can I use Campusly if I’m not a student?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                Campusly is exclusively for students. To maintain the security and trust of the platform, you need a valid student email to register.
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item 10" >
            <AccordionTrigger className="text-base capitalize">How can I contact Campusly for support or feedback?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                  For any questions or issues, you can contact our support team through the "Contact" section on the website, or send us feedback directly from your profile.
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item 11" >
            <AccordionTrigger className="text-base capitalize">Why should I use Campusly instead of other platforms?</AccordionTrigger>
              <AccordionContent className="text-base p-8 ">
                  Campusly is specifically tailored for university students, providing a safe and trusted environment. Unlike other platforms, it ensures transactions are local and among fellow students, reducing the risk of scams or fraud.
              </AccordionContent>
          </AccordionItem>

      </Accordion>
      </>
    )
  }
  