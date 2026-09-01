import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Privacy Policy | Tech Startups",
  description:
    "How Tech Startups and Verify Tech Bot collect, use, share, retain, and protect personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-12 sm:pt-24 sm:pb-16">
        <article className="prose prose-invert prose-headings:scroll-mt-24 prose-a:text-[#8ea1e1] prose-a:no-underline hover:prose-a:underline mx-auto max-w-4xl px-4 sm:px-6">
          <h1>Privacy Policy</h1>
          <p className="lead">
            This policy explains how Tech Startups handles personal information
            through the techstartups.gg website, our Discord community, and
            Verify Tech Bot.
          </p>
          <p>
            <strong>Effective date:</strong> August 31, 2026
          </p>

          <h2>Scope</h2>
          <p>
            Tech Startups (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Tech Startups
            Discord community, Verify Tech Bot, and the techstartups.gg website
            (together, the &quot;Services&quot;) and is responsible for the processing
            described in this policy. Discord separately processes information
            under its own{" "}
            <Link href="https://discord.com/privacy">privacy policy</Link> and
            terms.
          </p>

          <h2>Information we collect</h2>
          <p>
            Depending on how you use the Services, we process the following
            information to operate community and bot features:
          </p>
          <ul>
            <li>
              <strong>Discord account and member information:</strong> Discord
              user IDs, usernames, display names, avatars, account and server
              join dates, server roles, member join or role-update events, and,
              in some historical introduction records, custom status text that
              was visible at the time of submission. Verify Tech Bot no longer
              requests Discord Presence access and does not newly collect custom
              status text.
            </li>
            <li>
              <strong>Discord server and workflow identifiers:</strong> server,
              channel, message, thread, role, and interaction identifiers and
              related timestamps.
            </li>
            <li>
              <strong>Content submitted to configured workflows:</strong>
              introductions, builder or company updates, messages used for bot
              assistance, and attachment information such as filenames, URLs,
              sizes, and media types. The bot does not read every conversation
              for these workflows; it processes messages in specifically
              configured channels or when a user invokes a relevant feature.
            </li>
            <li>
              <strong>Community activity:</strong> introduction votes, reactions,
              channel subscriptions, company-channel ownership, verification or
              moderation status, and history needed to operate those features.
            </li>
            <li>
              <strong>Generated and administrative information:</strong> bot
              workflow status, quality-review results, summaries, audit records,
              error information, and other operational metadata.
            </li>
            <li>
              <strong>Website information:</strong> public company-directory
              information and basic request information that our hosting and
              security providers may process automatically, such as IP address,
              browser or device type, requested page, and request time.
            </li>
          </ul>
          <p>
            We receive this information from Discord, from content and
            interactions that users submit, and from community administrators.
            Please do not submit sensitive personal information through the bot
            or public community channels.
          </p>

          <h2>How we use information</h2>
          <p>We use the information described above to:</p>
          <ul>
            <li>onboard members and manage role-based community access;</li>
            <li>
              receive, review, edit, vote on, and publish member introductions;
            </li>
            <li>
              manage builder and company channels, updates, subscriptions, and
              discussion threads;
            </li>
            <li>
              forward qualifying posts and keep forwarded copies synchronized
              when their source messages are edited or deleted;
            </li>
            <li>
              provide requested bot assistance and create summaries or
              quality-review information;
            </li>
            <li>
              maintain moderation state, prevent abuse, troubleshoot errors,
              secure the Services, and comply with applicable obligations.
            </li>
          </ul>

          <h2>Message content and artificial intelligence</h2>
          <p>
            Verify Tech Bot accesses message content when it is necessary for a
            configured feature, such as processing an introduction, forwarding
            and synchronizing a builder update, or responding to a request for
            bot assistance. Users cannot opt out of this processing while using
            an intent-dependent workflow, but they can choose not to submit
            content to those workflows.
          </p>
          <p>
            When an AI-assisted feature is configured, we may send selected
            introduction text, builder or company updates, and relevant thread
            or channel context to Anthropic&apos;s commercial API to produce a
            summary, quality-review information, company metadata, or a requested
            response. We do not use Discord message content to train machine
            learning or AI models. Anthropic processes this information as our
            service provider under its commercial data-handling terms. AI output
            supports community or staff workflows and is not used to make a
            solely automated decision with legal or similarly significant
            effects.
          </p>

          <h2>How information is shared</h2>
          <p>We may disclose information in the following limited situations:</p>
          <ul>
            <li>
              <strong>Discord and community visibility:</strong> Discord provides
              the platform and API through which the bot operates. Introductions,
              updates, profile
              information, votes, and bot output may be displayed to moderators
              or community members according to the permissions of the relevant
              Discord channel.
            </li>
            <li>
              <strong>Service providers:</strong> providers that help us operate
              the Services, including database and application-hosting providers,
              infrastructure and security providers, and Anthropic for the
              AI-assisted processing described above. Their processing is
              governed by the agreements and privacy terms applicable to those
              services.
            </li>
            <li>
              <strong>Legal and safety reasons:</strong> when reasonably necessary
              to comply with law or valid legal process, protect rights and
              safety, investigate abuse, or secure the Services.
            </li>
          </ul>
          <p>
            We do not sell Discord API data or personal information, share it
            with data brokers, or use it for targeted advertising.
          </p>

          <h2>Retention and deletion</h2>
          <p>
            We retain personal information only while it is reasonably necessary
            to operate the features described in this policy, maintain required
            records, protect the Services, or comply with law. Some workflow
            records remain useful for longer than 30 days—for example, while an
            introduction, company channel, subscription, or moderation workflow
            remains active.
          </p>
          <p>
            Privacy requests are handled manually. After verifying a request, an
            operator locates records associated with the Discord user ID and
            deletes or anonymizes the applicable Discord API data unless
            retention is required by law. We also delete or anonymize API data
            when it is no longer needed for approved functionality, when Discord
            requires deletion, or when we stop operating the applicable Service.
            We do not currently promise automatic deletion after a fixed number
            of days.
          </p>
          <p>
            Anthropic states that standard commercial API inputs and outputs are
            deleted from its backend within 30 days, subject to limited safety,
            legal, feedback, and contractual exceptions. See Anthropic&apos;s{" "}
            <Link href="https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data">
              commercial data-retention documentation
            </Link>{" "}
            for details.
          </p>

          <h2>Your choices and privacy requests</h2>
          <p>
            You may ask us to access, correct, or delete personal information
            associated with you. To make a request, join the{" "}
            <Link href={env.NEXT_PUBLIC_DISCORD_URL}>
              Tech Startups Discord server
            </Link>{" "}
            and
            privately contact a server administrator or moderator. State that
            your request concerns Verify Tech Bot and provide your Discord user
            ID. Do not post sensitive information in a public channel.
          </p>

          <p>
            We may ask you to verify control of the relevant Discord account
            before acting on a request. Whether a particular request can be
            fulfilled may depend on applicable law, but we will respond and
            explain any limitation. You may use the same contact method to report
            a privacy, security, or application-policy concern.
          </p>

          <h2>Regional privacy rights</h2>
          <p>
            Depending on where you live, you may have rights to request access,
            correction, deletion, restriction, objection, or portability of
            personal information, to withdraw consent where processing relies on
            consent, and to appeal or complain to your local privacy regulator.
            We process information as necessary to provide requested community
            features, for legitimate interests such as operating and securing the
            Services, to comply with legal obligations, and with consent where
            applicable. Use the request method above to exercise a right.
          </p>

          <h2>Security</h2>
          <p>
            We use commercially reasonable administrative and technical
            safeguards designed to protect Discord API data, including access
            controls, encryption in transit, and encryption at rest. No system is
            completely secure, and we cannot guarantee that unauthorized access
            or disclosure will never occur.
          </p>

          <h2>International processing</h2>
          <p>
            Our community and service providers operate internationally.
            Information may therefore be processed in countries other than the
            country where you live, including the United States, where privacy
            laws may differ. International processing is subject to applicable
            law and the transfer terms and safeguards offered by the relevant
            service providers.
          </p>

          <h2>Children</h2>
          <p>
            The Services are not directed to children under 13 or under the
            minimum age required to use Discord in their country. If you believe
            a child has provided personal information contrary to these
            requirements, contact us so we can review and delete it as
            appropriate.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as our Services or legal obligations
            change. We will post the updated policy here and revise the effective
            date. If a change materially affects how Verify Tech Bot uses Discord
            API data, we will provide additional notice when appropriate and
            complete any required Discord review before applying the change.
          </p>

          <h2>Contact us</h2>
          <p>
            For privacy questions, requests, or application-related reports,
            join the{" "}
            <Link href={env.NEXT_PUBLIC_DISCORD_URL}>
              Tech Startups Discord server
            </Link>{" "}
            and
            privately contact a server administrator or moderator.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
