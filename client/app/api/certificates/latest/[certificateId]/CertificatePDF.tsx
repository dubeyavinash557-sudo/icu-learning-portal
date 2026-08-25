import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f8fafc",
    padding: 28,
    fontFamily: "Helvetica",
  },

  outerBorder: {
    flex: 1,
    borderWidth: 3,
    borderColor: "#0e7490",
    padding: 8,
  },

  innerBorder: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 28,
    position: "relative",
  },

  topAccent: {
    height: 7,
    width: "100%",
    backgroundColor: "#0891b2",
    marginBottom: 22,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  brandMark: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0e7490",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  brandMarkText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },

  brandText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    letterSpacing: 1.2,
  },

  brandSubtext: {
    marginTop: 4,
    fontSize: 8,
    color: "#0891b2",
    letterSpacing: 2,
  },

  certificateLabel: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 10,
    color: "#0e7490",
    fontWeight: "bold",
    letterSpacing: 3,
  },

  title: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 29,
    fontWeight: "bold",
    color: "#0f172a",
  },

  divider: {
    width: 100,
    height: 2,
    backgroundColor: "#f59e0b",
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20,
  },

  presentedText: {
    textAlign: "center",
    fontSize: 11,
    color: "#64748b",
  },

  studentName: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#0e7490",
  },

  studentUnderline: {
    width: 270,
    height: 1,
    backgroundColor: "#cbd5e1",
    alignSelf: "center",
    marginTop: 8,
  },

  completionText: {
    marginTop: 22,
    textAlign: "center",
    fontSize: 11,
    color: "#64748b",
  },

  courseTitle: {
    marginTop: 10,
    marginHorizontal: 35,
    textAlign: "center",
    fontSize: 19,
    lineHeight: 1.35,
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  achievementBox: {
    marginTop: 22,
    marginHorizontal: 45,
    padding: 12,
    borderWidth: 1,
    borderColor: "#bae6fd",
    backgroundColor: "#f0f9ff",
    borderRadius: 6,
    alignItems: "center",
  },

  achievementTitle: {
    fontSize: 9,
    color: "#0e7490",
    fontWeight: "bold",
    letterSpacing: 1.3,
  },

  achievementText: {
    marginTop: 5,
    fontSize: 9,
    color: "#475569",
    textAlign: "center",
  },

  verificationRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  verifiedBadge: {
    borderWidth: 1,
    borderColor: "#86efac",
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },

  verifiedText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#15803d",
    letterSpacing: 1,
  },

  detailsRow: {
    position: "absolute",
    left: 28,
    right: 28,
    bottom: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 12,
  },

  detailColumn: {
    width: "31%",
  },

  detailLabel: {
    fontSize: 7,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  detailValue: {
    marginTop: 4,
    fontSize: 8,
    fontWeight: "bold",
    color: "#334155",
  },

  footer: {
    position: "absolute",
    left: 28,
    right: 28,
    bottom: 20,
    textAlign: "center",
  },

  footerText: {
    fontSize: 7,
    color: "#94a3b8",
    letterSpacing: 0.7,
  },

  cornerTopLeft: {
    position: "absolute",
    left: 8,
    top: 8,
    width: 28,
    height: 28,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: "#f59e0b",
  },

  cornerTopRight: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 28,
    height: 28,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: "#f59e0b",
  },

  cornerBottomLeft: {
    position: "absolute",
    left: 8,
    bottom: 8,
    width: 28,
    height: 28,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#f59e0b",
  },

  cornerBottomRight: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 28,
    height: 28,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#f59e0b",
  },
});

type CertificatePDFProps = {
  studentName: string;
  courseTitle: string;
  certificateNo: string;
  issuedAt: Date;
};

function formatIssuedDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function CertificatePDF({
  studentName,
  courseTitle,
  certificateNo,
  issuedAt,
}: CertificatePDFProps) {
  return (
    <Document
      title="ICU Learning Portal Certificate"
      author="ICU Learning Portal"
      subject="Certificate of Completion"
      creator="ICU Learning Portal"
    >
      <Page
        size="A4"
        orientation="landscape"
        style={styles.page}
      >
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            {/* Decorative corners */}
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />

            {/* Top accent */}
            <View style={styles.topAccent} />

            {/* Branding */}
            <View style={styles.brandRow}>
              <View style={styles.brandMark}>
                <Text style={styles.brandMarkText}>
                  ICU
                </Text>
              </View>

              <View>
                <Text style={styles.brandText}>
                  ICU LEARNING PORTAL
                </Text>

                <Text style={styles.brandSubtext}>
                  PROFESSIONAL CRITICAL CARE EDUCATION
                </Text>
              </View>
            </View>

            {/* Certificate title */}
            <Text style={styles.certificateLabel}>
              VERIFIED LEARNING ACHIEVEMENT
            </Text>

            <Text style={styles.title}>
              Certificate of Completion
            </Text>

            <View style={styles.divider} />

            {/* Student */}
            <Text style={styles.presentedText}>
              This certificate is proudly presented to
            </Text>

            <Text style={styles.studentName}>
              {studentName}
            </Text>

            <View style={styles.studentUnderline} />

            {/* Course */}
            <Text style={styles.completionText}>
              for successfully completing the course
            </Text>

            <Text style={styles.courseTitle}>
              {courseTitle}
            </Text>

            {/* Achievement */}
            <View style={styles.achievementBox}>
              <Text style={styles.achievementTitle}>
                COURSE COMPLETION ACHIEVEMENT
              </Text>

              <Text style={styles.achievementText}>
                The learner has successfully completed
                the required course curriculum through
                ICU Learning Portal.
              </Text>
            </View>

            {/* Verification badge */}
            <View style={styles.verificationRow}>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>
                  ✓ VERIFIED CERTIFICATE
                </Text>
              </View>
            </View>

            {/* Certificate details */}
            <View style={styles.detailsRow}>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>
                  Certificate No.
                </Text>

                <Text style={styles.detailValue}>
                  {certificateNo}
                </Text>
              </View>

              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>
                  Issue Date
                </Text>

                <Text style={styles.detailValue}>
                  {formatIssuedDate(issuedAt)}
                </Text>
              </View>

              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>
                  Issuing Organization
                </Text>

                <Text style={styles.detailValue}>
                  ICU Learning Portal
                </Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                ICU Learning Portal • Professional Critical Care Education
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}