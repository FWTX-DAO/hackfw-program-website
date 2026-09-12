# Tokenized Industrial Real Estate track research

Researched September 12, 2026. The public brief is track 04 in `src/components/ui/vertical-tabs.tsx`, immediately before Open Forum, and is mirrored in `public/llms.txt`.

The challenge is to make industrial property opportunities understandable and actionable for humans and AI agents through a shared marketplace record. The organization below is a proposed design direction informed by the sources, not a required architecture or a claim that a marketplace already provides these capabilities.

## Organize around the asset

| Record | Information to connect |
| --- | --- |
| Property identity and industrial fit | Stable property and parcel identifiers, address, owner or operator, area and units, power capacity, clear height, loading docks, floor loads, zoning, and transport access. |
| Documents and evidence | Title and lien records, surveys, environmental and condition reports, insurance, permits, leases and amendments. Associate each file with its property, issuer, version, effective date, access policy, and the facts it supports. |
| Operations and economics | Rent rolls, occupancy, lease expirations, operating expenses, taxes, maintenance, capital improvements, valuations, and debt. Preserve reporting periods, assumptions, and source documents. |
| Ownership and token terms | The property-owning entity or trust, issuer, offering documents, ownership register, token identifiers, holder rights, distributions, and eligibility or transfer restrictions. Make the relationship between the property and the token explicit. |
| Transactions | Offers, diligence requests, approvals, escrow, signed closing documents, settlement references, transfers, distributions, and reconciliation status. Distinguish proposed, approved, and completed events. |
| Human and agent access | Searchable listings and readable deal rooms backed by structured records. Apply permissions to documents, extracted data, and actions; return source citations, freshness, and missing or conflicting information. |

## Research behind the brief

- **Comparable property data has an existing foundation.** RESO defines standardized real estate fields and lookups, supports extensions, and pairs its Data Dictionary with Web API standards. This supports using consistent names and units while extending the model for industrial facilities, documents, and ownership interests. [RESO Data Dictionary](https://www.reso.org/data-dictionary/).
- **Industrial listings need operational detail.** Prologis's Logistics Center 3 brochure includes warehouse and office area, clear height, dock doors, electrical service, cooling, and sprinklers. These are useful examples of fields that a person or agent could compare across assets. [Prologis property brochure](https://prologis.getbynder.com/m/1956d33d70f2c274/original/PLD-Logistics-Center-3-Brochure.pdf).
- **Missing evidence belongs in the record.** EPA's All Appropriate Inquiries material describes environmental reports, professional opinions, and significant data gaps. This informs the proposal to expose report dates, scope, and unresolved information alongside extracted facts. [EPA All Appropriate Inquiries](https://www.epa.gov/brownfields/brownfields-all-appropriate-inquiries).
- **The token's rights and underlying records matter.** The January 2026 SEC staff statement distinguishes issuer-sponsored and third-party tokenization models, whose structures and holder rights can differ. The track therefore asks teams to connect tokens to entities, offering documents, rights, and ownership records. This staff statement is not a Commission rule. [SEC staff statement on tokenized securities](https://www.sec.gov/newsroom/speeches-statements/corp-fin-statement-tokenized-securities-012826-statement-tokenized-securities).
- **Transfer permissions can be modeled explicitly.** ERC-3643 describes identity checks and configurable offering rules for permissioned token transfers. It is a technical reference for eligibility and transfer workflows, not a requirement to use that standard or evidence that a particular offering complies with law. [ERC-3643 compliance framework](https://docs.erc3643.org/erc-3643/overview-of-the-protocol/built-in-compliance-framework).
- **Agent access can reuse the same underlying records.** MCP defines addressable resources and authorization for access on behalf of resource owners. An API or MCP interface is one possible way to expose property records; document access and authority to commit a transaction remain separate application permissions. [MCP resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources), [MCP authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization).
- **There is relevant partner context.** LiquidAcre describes fractional acreage and tokenized land-trust interests. That is a useful example of why the property, trust, and token need linked records. Its marketing page does not establish industrial marketplace availability or a participant integration. [LiquidAcre](https://liquidacre.com/).

## Possible demonstration

Use a small set of synthetic industrial properties. Let a person and an agent find sites with specified power and loading requirements, compare lease and cost information, and trace answers to document pages. Include an outdated report or conflicting lease amendment so the system can identify the gap. Then prepare a proposed transaction for human approval and show its subsequent status in the same property record. Teams can choose a focused part of this workflow for their prototype.
