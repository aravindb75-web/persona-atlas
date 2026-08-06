"use client";

import { useState } from "react";
import { TYPES, ROLES, IDENTITY } from "@/lib/types";
import { AXES } from "@/lib/questions";

// Build representative dimension strengths (mirrors Report.buildDims).
function buildDims(code, identity) {
  const map = { E: "EI", I: "EI", N: "NS", S: "NS", T: "TF", F: "TF", J: "JP", P: "JP" };
  const spread = [72, 66, 61, 69];
  const dims = {};
  code.split("").forEach((letter, idx) => {
    const dim = map[letter];
    const isFirst = AXES[dim].first === letter;
    dims[dim] = { letter, strength: spread[idx] };
  });
  dims.AT = { letter: identity, strength: 64 };
  return dims;
}

export default function DownloadPdf({ code, identity }) {
  const [busy, setBusy] = useState(false);

  async function make() {
    setBusy(true);
    try {
      const { pdf, Document, Page, Text, View, StyleSheet } = await import("@react-pdf/renderer");
      const t = TYPES[code];
      const role = ROLES[t.role];
      const id = IDENTITY[identity];
      const c = role.color;
      const dims = buildDims(code, identity);

      const s = StyleSheet.create({
        page: { padding: 42, fontSize: 10.5, color: "#2b2740", fontFamily: "Helvetica", lineHeight: 1.5 },
        cover: { backgroundColor: c, color: "#fff", padding: 48, height: "100%", justifyContent: "center" },
        brand: { fontSize: 12, letterSpacing: 3, opacity: 0.85, fontFamily: "Helvetica-Bold" },
        code: { fontSize: 20, letterSpacing: 4, marginTop: 24, fontFamily: "Helvetica-Bold" },
        title: { fontSize: 46, marginTop: 6, fontFamily: "Helvetica-Bold" },
        tagline: { fontSize: 14, marginTop: 12, opacity: 0.95, maxWidth: 380 },
        chip: { fontSize: 11, marginTop: 20, opacity: 0.9 },
        h2: { fontSize: 16, color: c, marginTop: 20, marginBottom: 6, fontFamily: "Helvetica-Bold" },
        h3: { fontSize: 10, color: "#6a6685", marginTop: 12, marginBottom: 3, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1 },
        p: { marginBottom: 4 },
        li: { marginBottom: 3, paddingLeft: 10 },
        row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
        barBg: { height: 7, backgroundColor: "#eceafa", borderRadius: 4, marginTop: 2, marginBottom: 8 },
        barFg: { height: 7, backgroundColor: c, borderRadius: 4 },
        tagWrap: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
        tag: { fontSize: 9.5, backgroundColor: "#f1eefb", color: c, borderRadius: 8, paddingVertical: 3, paddingHorizontal: 7, marginRight: 5, marginBottom: 5 },
        foot: { position: "absolute", bottom: 24, left: 42, right: 42, fontSize: 8, color: "#9a95b5", textAlign: "center" },
        note: { fontSize: 8.5, color: "#9a6b18", backgroundColor: "#fdf6e8", padding: 8, borderRadius: 6, marginTop: 14 },
      });

      const Li = ({ children }) => <Text style={s.li}>• {children}</Text>;
      const Tags = ({ items }) => (
        <View style={s.tagWrap}>{items.map((x) => <Text key={x} style={s.tag}>{x}</Text>)}</View>
      );
      const Foot = () => <Text style={s.foot} fixed>Personova · {t.name} ({code}-{identity}) · Educational guidance, not professional advice.</Text>;

      const doc = (
        <Document title={`Personova — ${t.name}`} author="Personova">
          {/* Cover */}
          <Page size="A4">
            <View style={s.cover}>
              <Text style={s.brand}>PERSONOVA · PERSONALITY REPORT</Text>
              <Text style={s.code}>{code}-{identity}</Text>
              <Text style={s.title}>The {t.name}</Text>
              <Text style={s.tagline}>{t.tagline}</Text>
              <Text style={s.chip}>{role.label} · {id.label} Identity</Text>
            </View>
          </Page>

          {/* Body */}
          <Page size="A4" style={s.page}>
            <Text style={s.h2}>Who the {t.name} is</Text>
            <Text style={s.p}>{t.overview}</Text>
            <Text style={s.h3}>The {id.label} ({identity}) variant</Text>
            <Text style={s.p}>{id.blurb}</Text>

            <Text style={s.h2}>Your five dimensions</Text>
            {["EI", "NS", "TF", "JP", "AT"].map((k) => {
              const d = dims[k];
              const label = AXES[k].poles[d.letter === AXES[k].first ? 0 : 1];
              return (
                <View key={k}>
                  <View style={s.row}><Text>{AXES[k].label}: {label} ({d.letter})</Text><Text>{d.strength}%</Text></View>
                  <View style={s.barBg}><View style={[s.barFg, { width: `${d.strength}%` }]} /></View>
                </View>
              );
            })}

            <Text style={s.h2}>Strengths & blind spots</Text>
            <Text style={s.h3}>Natural strengths</Text>
            {t.strengths.map((x) => <Li key={x}>{x}</Li>)}
            <Text style={s.h3}>Watch out for</Text>
            {t.weaknesses.map((x) => <Li key={x}>{x}</Li>)}
            <Foot />
          </Page>

          {/* Education + Career */}
          <Page size="A4" style={s.page}>
            <Text style={s.h2}>Education & how you learn</Text>
            <Text style={s.p}>{t.education.style}</Text>
            <Text style={s.h3}>Environments where you thrive</Text>
            {t.education.environments.map((x) => <Li key={x}>{x}</Li>)}
            <Text style={s.h3}>Study & choice tips</Text>
            {t.education.tips.map((x) => <Li key={x}>{x}</Li>)}

            <Text style={s.h2}>Careers & likely fields of success</Text>
            <Text style={s.h3}>Fields where you shine</Text>
            <Tags items={t.fields} />
            <Text style={s.h3}>Roles that fit you well</Text>
            <Tags items={t.careers} />
            <Text style={s.h3}>Your work style</Text>
            <Text style={s.p}>{t.workStyle}</Text>
            <Foot />
          </Page>

          {/* Finance + Relationships + Growth */}
          <Page size="A4" style={s.page}>
            <Text style={s.h2}>Your financial style</Text>
            <Text style={s.p}>{t.finance.style}</Text>
            <Text style={s.h3}>Money strengths</Text>
            {t.finance.strengths.map((x) => <Li key={x}>{x}</Li>)}
            <Text style={s.h3}>Money pitfalls</Text>
            {t.finance.pitfalls.map((x) => <Li key={x}>{x}</Li>)}
            <Text style={s.h3}>Advice tuned to you</Text>
            {t.finance.tips.map((x) => <Li key={x}>{x}</Li>)}

            <Text style={s.h2}>Relationships & life partner</Text>
            <Text style={s.h3}>As a partner</Text>
            <Text style={s.p}>{t.relationships.asPartner}</Text>
            <Text style={s.h3}>Who complements you</Text>
            <Text style={s.p}>{t.relationships.idealPartner}</Text>
            <Text style={s.h3}>Watch out for</Text>
            {t.relationships.watchOut.map((x) => <Li key={x}>{x}</Li>)}

            <Text style={s.h2}>Your growth path</Text>
            {t.growth.map((x) => <Li key={x}>{x}</Li>)}
            <Text style={s.h3}>People who share your type</Text>
            <Text style={s.p}>{t.famous.join(" · ")}</Text>

            <Text style={s.note}>This report offers general, educational guidance based on personality tendencies. It is not professional financial, career, medical, or relationship advice. For important decisions, consult a qualified professional.</Text>
            <Foot />
          </Page>
        </Document>
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Personova-${code}-${identity}-${t.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Sorry — the PDF couldn't be generated. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button className="btn btn--primary no-print" onClick={make} disabled={busy}>
      {busy ? "Building your PDF…" : "⬇ Download full report (PDF)"}
    </button>
  );
}
