import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  type AccordionToggleEventHandler,
  Divider,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Add20Filled, Subtract20Filled } from '@fluentui/react-icons';
import { useCallback, useState } from 'react';
import { InternalLink } from '../ui/links/fui-tanstack';

const useClasses = makeStyles({
  header: {
    '> .fui-AccordionHeader__button': {
      paddingLeft: '0px',
      fontSize: tokens.fontSizeBase400,
    },
  },
  ul: {
    paddingLeft: '10px',
    paddingBottom: '10px',
    '> li': {
      marginBottom: tokens.spacingVerticalXS,
    },
  },
});

export const AccordionProductInfo = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const handleToggle = useCallback<AccordionToggleEventHandler>(
    (_, data) => {
      const dv = data.value as number;
      if (openItems.includes(dv)) {
        setOpenItems(openItems.filter((v) => v !== dv));
      } else {
        setOpenItems(data.openItems as number[]);
      }
    },
    [openItems],
  );
  const classes = useClasses();

  return (
    <Accordion
      onToggle={handleToggle}
      collapsible
      multiple
      style={{
        fontSize: tokens.fontSizeBase400,
        lineHeight: tokens.lineHeightBase400,
      }}
    >
      <AccordionItem value={1}>
        <AccordionHeader
          expandIcon={openItems.includes(1) ? <Subtract20Filled /> : <Add20Filled />}
          className={classes.header}
          expandIconPosition="end"
        >
          DETAILS
        </AccordionHeader>
        <AccordionPanel>
          <ul className={classes.ul}>
            <li>
              NONE of our prints come framed. Please see our{' '}
              <InternalLink to="/pages/faqs" accent>
                FAQs
              </InternalLink>{' '}
              for more information on the services we do offer or visit the links below to learn
              more about our framing recommendations:
            </li>
            <li>
              More info on where to frame your art:{' '}
              <InternalLink to="/pages/where-to-buy-frames" accent>
                Where To Buy Frames
              </InternalLink>
            </li>
            <li>
              More info about custom framing:&nbsp;
              <InternalLink to="/pages/custom-framing" accent>
                FAQs
              </InternalLink>
            </li>
            <li>
              Your artwork will ship without the watermark that is visible on the product image.
            </li>
            <li>
              Your artwork will ship without the &apos;color name&apos; that is listed across the
              artwork in instances where the art is sold in an array of different colors. The color
              name is used to define and clarify which print color you are purchasing only.
            </li>
            <li>
              We do add an additional, complimentary, white border around your artwork (increases
              overall paper size). This border is an extension of the paper the artwork is printed
              on. The artwork print size itself will not change in&nbsp;dimensions from the size you
              purchase, only around the margins of your chosen artwork size will the white border be
              extended. We add this white border to make framing easier. The added border will tuck
              under the lip of the frame and it will be used to hold the artwork in place. Without
              it, the printed artwork itself may be covered by the lip of the frame. Therefore, we
              add the white border to prevent this from happening.
            </li>
          </ul>
        </AccordionPanel>
        <Divider />
      </AccordionItem>
      <AccordionItem value={2}>
        <AccordionHeader
          expandIcon={openItems.includes(2) ? <Subtract20Filled /> : <Add20Filled />}
          expandIconPosition="end"
          className={classes.header}
        >
          SHIPPING
        </AccordionHeader>
        <AccordionPanel>
          <ul className={classes.ul}>
            <li>We take special pride in our shipping services and our shipping materials.</li>
            <li>
              All artwork is shipped in a high quality, very durable shipping container. Your
              artwork is wrapped in a special elixir paper so it will be protected during
              delivery.{' '}
            </li>
            <li>
              From the time your artwork is printed, it is handled with gloves so no direct human
              contact will ever touch your print directly.
            </li>
            <li>
              Most artwork is processed in 3-5 business days (Monday - Friday) in most instances.
            </li>
            <li>
              For most orders, delivery is free and will ship via USPS, UPS or FedEx. International
              delivery carriers may differ.
            </li>
            <li>All orders placed in the USA will print and ship from our US printer.</li>
            <li>
              All orders placed in Australia and New Zealand will typically be printed and shipped
              from our printer in Australia. The delivery cost factors in the price difference for
              printing in Australia. or New Zealand compared to our USA printing costs.
            </li>
            <li>
              We do ship worldwide and we try to make it as efficient and seamless as possible for
              you to receive your order once it has been placed with us.
            </li>
            <li>
              We can offer a rush printing service and a rush delivery option for you. Please send
              us a note to inquire about both of these options as each one will incur an additional
              service fee and expedited shipping charge.
            </li>
          </ul>
        </AccordionPanel>
        <Divider />
      </AccordionItem>
      <AccordionItem value={3}>
        <AccordionHeader
          expandIcon={openItems.includes(3) ? <Subtract20Filled /> : <Add20Filled />}
          className={classes.header}
          expandIconPosition="end"
        >
          RETURNS
        </AccordionHeader>
        <AccordionPanel>
          <ul className={classes.ul}>
            <li>
              Currently, we do not provide returns on purchased prints as all our orders are
              made-to-order only.{' '}
            </li>
            <li>
              To find out more information about our return policy, please visit:&nbsp;
              <InternalLink to="/pages/returns" accent>
                Returns
              </InternalLink>
            </li>
          </ul>
        </AccordionPanel>
        <Divider />
      </AccordionItem>
      <AccordionItem value={4}>
        <AccordionHeader
          expandIcon={openItems.includes(4) ? <Subtract20Filled /> : <Add20Filled />}
          className={classes.header}
          expandIconPosition="end"
        >
          MATERIALS
        </AccordionHeader>
        <AccordionPanel>
          <ul className={classes.ul}>
            <li>
              One of the most common questions we get is in reference to what are the differences
              between Giclée and Photo Rag.
            </li>
            <li>
              We cover this information a bit more in depth so it will help you decide between the
              two paper options we supply:{' '}
              <InternalLink to="/pages/material-differences" accent>
                Material Differences
              </InternalLink>
            </li>
            <li>
              For a quick and simple overview, Photo Rag is simply one of the best papers available
              anywhere. The Photo Rag paper absorbs inks deeper and provides richer colors overall.
            </li>
            <li>
              Our Giclee printed papers are a high performance sustainable ink injected onto a matte
              finished fine art paper. Both paper types (Giclee fine art papers and Photo Rag) have
              archival properties and are acid free. Photo Rag can handle bright, sun-drenched
              spaces better and longer than Giclee fine art papers so if the artwork will be exposed
              to more harsh light then Photo Rag will be a better choice.
            </li>
            <li>
              When offered, our canvas prints are gallery stretched and wrapped onto a wood mount
              with a 3/4&quot; depth.
            </li>
            <li>
              When available, our rolled canvas is simply a rolled sheet of canvas with a 1&quot;
              border.
            </li>
            <li>
              Because we are unable to ship canvas wood mounted prints over 40&quot; in either
              height or width (due to the cost of freight shipping), we recommend our rolled canvas
              if offered on a listing as a viable option as&nbsp;it can be stretched and mounted by
              a local arts and crafts store or with a local framer near you should you choose to do
              so. This allows you to save money on the freight shipping cost for canvas stretched
              and wrapped artwork over 40&quot; in either width or height.
            </li>
            <li>
              All prices listed as &apos;Canvas&apos; are for gallery wrapped wood mounted canvas.
              If &apos;Rolled Canvas&apos; is offered for a print, it will be listed as &apos;Rolled
              Canvas&apos;.
            </li>
            <li>
              We also will add a 0.25&quot;, 0.5&quot; or 1&quot; white border to each side of fine
              art paper artwork unless you indicate to us differently upon checkout. This border
              helps make the framing of your art easier should you decide to. The white border does
              increase the overall paper size so a 24&quot; x 30&quot; print for example with a
              0.5&quot; border added to the perimeter will make the final paper size 25&quot; x
              31&quot;.
            </li>
            <li>
              For all other questions, don&apos;t hesitate to reach out to us:{' '}
              <InternalLink to="/about" accent>
                Contact Us
              </InternalLink>
            </li>
          </ul>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
