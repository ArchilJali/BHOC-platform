# Security Policy

## Scope
This repository is the core evidence and public web platform for BHOC / Precision Oxygenation Therapeutics.

## Reporting a security issue
Do not publish suspected vulnerabilities, leaked credentials, access tokens, private keys, or exploitation details in a public GitHub issue.

Report security concerns privately to `info@bhoctherapeutics.com` with the affected URL, reproduction steps, impact, and supporting evidence.

## Repository protection principles
- The default branch must remain protected against deletion and force-push.
- Production changes should be traceable to commits and, when branch rules are strengthened, reviewed through pull requests.
- Automated validation should pass before production changes are merged.
- Secrets, API keys, access tokens, passwords, private keys, patient data, confidential partner information, and unpublished proprietary manufacturing information must never be committed to this public repository.
- External evidence must remain distinguishable from verified/core evidence until reviewed and approved.

## Recovery
Git history is part of the recovery record but must not be treated as the only backup. Independent repository snapshots or mirrors should be maintained outside the production repository.

## Public-content warning
This is a public repository. Any committed file should be assumed to be readable, downloadable, indexed, archived, and potentially copied by third parties.
