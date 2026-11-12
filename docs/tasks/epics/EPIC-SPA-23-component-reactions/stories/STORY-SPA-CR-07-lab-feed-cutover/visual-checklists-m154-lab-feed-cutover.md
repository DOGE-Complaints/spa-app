# Visual checklist — M154 lab-feed cutover (CR-07)

**Date:** 2026-10-15T11:08:46Z  
**Path A** · mockup accepted · OP eye **Absent** · Partial = **BLOCK**  
**Artboard:** M154 tone · **normative** OP-UX-MIRROR §3.4  
**Route:** `#/lab/feed` · FixtureAdapter only

| Check | Structure | OP eye |
|-------|-----------|--------|
| Post-root reaction slot uses ReactionsMount (not live FeedReactionPlane) | Present (shots 01–02 · vitest) | Absent |
| Comment reaction slots use ReactionsMount (`target=comment`) | Present (shots 03–04 · vitest) | Absent |
| CR-05 open/dismiss + CR-06 chrome visible in post/thread context | Present (shot 02 · tip/close) | Absent |
| No dual live FeedReaction* + ReactionsMount | Present (*Deprecated · RETIRE.md) | Absent |
| No M155 · no invent HTTP · `#/next/feed` unchanged | Present (`data-m155-oos`) | Absent |

**Verdict:** structure held · visual **BLOCK** until OP eye PASS.

**md5 prefixes:** `defd86bed1f9` · `7885f9c46902` · `b91eaa7e2d31` · `6c1a314cdbab` · `97ffa443dcfe`
