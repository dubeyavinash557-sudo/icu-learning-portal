import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#eef4f8",
    padding: 24,
    fontFamily: "Helvetica",
  },

  outerFrame: {
    flex: 1,
    borderWidth: 4,
    borderColor: "#0b7285",
    padding: 7,
    backgroundColor: "#ffffff",
  },

  innerFrame: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#b8cbd3",
    position: "relative",
    padding: 30,
    backgroundColor: "#ffffff",
  },

  topGoldLine: {
    height: 5,
    width: "100%",
    backgroundColor: "#c59b3b",
    marginBottom: 18,
  },

  topHeader: {
    alignItems: "center",
    justifyContent: "center",
  },

  emblemOuter: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: "#c59b3b",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fbfc",
  },

  emblemInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0b7285",
    alignItems: "center",
    justifyContent: "center",
  },

  emblemText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },

  organization: {
    marginTop: 9,
    fontSize: 20,
    fontWeight: "bold",
    color: "#12343b",
    letterSpacing: 1.5,
    textAlign: "center",
  },

  organizationSub: {
    marginTop: 4,
    fontSize: 7,
    fontWeight: "bold",
    color: "#0b7285",
    letterSpacing: 2.2,
    textAlign: "center",
  },

  certificateLabel: {
    marginTop: 25,
    fontSize: 9,
    fontWeight: "bold",
    color: "#8a6a21",
    letterSpacing: 3,
    textAlign: "center",
  },

  certificateTitle: {
    marginTop: 7,
    fontSize: 28,
    fontWeight: "bold",
    color: "#102a43",
    textAlign: "center",
    letterSpacing: 0.8,
  },

  goldDivider: {
    marginTop: 11,
    width: 130,
    height: 2,
    backgroundColor: "#c59b3b",
    alignSelf: "center",
  },

  presentedText: {
    marginTop: 20,
    fontSize: 10,
    color: "#64748b",
    textAlign: "center",
  },

  studentName: {
    marginTop: 10,
    fontSize: 27,
    fontWeight: "bold",
    color: "#0b7285",
    textAlign: "center",
  },

  nameLine: {
    marginTop: 6,
    width: 330,
    height: 1,
    backgroundColor: "#cbd5e1",
    alignSelf: "center",
  },

  completionText: {
    marginTop: 19,
    fontSize: 10,
    color: "#64748b",
    textAlign: "center",
  },

  professionalLabel: {
    marginTop: 9,
    fontSize: 8,
    fontWeight: "bold",
    color: "#8a6a21",
    letterSpacing: 2,
    textAlign: "center",
  },

  courseTitle: {
    marginTop: 7,
    marginHorizontal: 55,
    fontSize: 20,
    lineHeight: 1.3,
    fontWeight: "bold",
    color: "#173f5f",
    textAlign: "center",
  },

  achievementBox: {
    marginTop: 17,
    marginHorizontal: 55,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#c8dce2",
    backgroundColor: "#f5fafb",
    alignItems: "center",
  },

  achievementTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#0b7285",
    letterSpacing: 1.5,
    textAlign: "center",
  },

  achievementText: {
    marginTop: 5,
    fontSize: 8,
    lineHeight: 1.35,
    color: "#52616b",
    textAlign: "center",
  },

  detailsArea: {
    position: "absolute",
    left: 30,
    right: 30,
    bottom: 55,
    borderTopWidth: 1,
    borderTopColor: "#d8e2e7",
    paddingTop: 11,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detailColumnLeft: {
    width: "30%",
    alignItems: "flex-start",
  },

  detailColumnCenter: {
    width: "30%",
    alignItems: "center",
  },

  detailColumnRight: {
    width: "30%",
    alignItems: "flex-end",
  },

  detailLabel: {
    fontSize: 6.5,
    color: "#8a9aa5",
    fontWeight: "bold",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  detailValue: {
    marginTop: 4,
    fontSize: 8,
    color: "#263943",
    fontWeight: "bold",
  },

  verificationBadge: {
    position: "absolute",
    left: 30,
    bottom: 105,
    borderWidth: 1,
    borderColor: "#78a889",
    backgroundColor: "#f4faf5",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  verificationText: {
    fontSize: 7,
    color: "#287343",
    fontWeight: "bold",
    letterSpacing: 0.8,
  },

  website: {
    position: "absolute",
    right: 30,
    bottom: 105,
    fontSize: 7,
    color: "#0b7285",
  },

  footer: {
    position: "absolute",
    left: 30,
    right: 30,
    bottom: 20,
    alignItems: "center",
  },

  footerLine: {
    width: 180,
    height: 1,
    backgroundColor: "#d6e0e5",
    marginBottom: 5,
  },

  footerText: {
    fontSize: 6.5,
    color: "#8a9aa5",
    letterSpacing: 0.5,
    textAlign: "center",
  },

  cornerTopLeft: {
    position: "absolute",
    left: 7,
    top: 7,
    width: 34,
    height: 34,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: "#c59b3b",
  },

  cornerTopRight: {
    position: "absolute",
    right: 7,
    top: 7,
    width: 34,
    height: 34,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: "#c59b3b",
  },

  cornerBottomLeft: {
    position: "absolute",
    left: 7,
    bottom: 7,
    width: 34,
    height: 34,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#c59b3b",
  },

  cornerBottomRight: {
    position: "absolute",
    right: 7,
    bottom: 7,
    width: 34,
    height: 34,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#c59b3b",
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
      title="ICU Learning Portal Professional Certificate"
      author="ICU Learning Portal"
      subject="Professional Course Certificate"
      creator="ICU Learning Portal"
    >
      <Page
        size="A4"
        orientation="landscape"
        style={styles.page}
      >
        <View style={styles.outerFrame}>
          <View style={styles.innerFrame}>
            {/* Decorative corners */}
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />

            {/* Top accent */}
            <View style={styles.topGoldLine} />

            {/* Organization header */}
            <View style={styles.topHeader}>
              <View style={styles.emblemOuter}>
                <View style={styles.emblemInner}>
                  <Text style={styles.emblemText}>
                    ICU
                  </Text>
                </View>
              </View>

              <Text style={styles.organization}>
                ICU LEARNING PORTAL
              </Text>

              <Text style={styles.organizationSub}>
                PROFESSIONAL CRITICAL CARE EDUCATION
              </Text>
            </View>

            {/* Certificate heading */}
            <Text style={styles.certificateLabel}>
              PROFESSIONAL COURSE CERTIFICATE
            </Text>

            <Text style={styles.certificateTitle}>
              Certificate of Completion
            </Text>

            <View style={styles.goldDivider} />

            {/* Learner */}
            <Text style={styles.presentedText}>
              This certificate is proudly presented to
            </Text>

            <Text style={styles.studentName}>
              {studentName}
            </Text>

            <View style={styles.nameLine} />

            {/* Course */}
            <Text style={styles.completionText}>
              for successfully completing the professional course
            </Text>

            <Text style={styles.professionalLabel}>
              CRITICAL CARE &amp; NURSING EDUCATION
            </Text>

            <Text style={styles.courseTitle}>
              {courseTitle}
            </Text>

            {/* Achievement statement */}
            <View style={styles.achievementBox}>
              <Text style={styles.achievementTitle}>
                COURSE COMPLETION ACHIEVEMENT
              </Text>

              <Text style={styles.achievementText}>
                The learner has successfully completed the required
                course curriculum and learning activities through
                ICU Learning Portal.
              </Text>
            </View>

            {/* Verification */}
            <View style={styles.verificationBadge}>
              <Text style={styles.verificationText}>
                ✓ VERIFIED COURSE CERTIFICATE
              </Text>
            </View>

            <Text style={styles.website}>
              iculearningportal.com
            </Text>

            {/* Certificate details */}
            <View style={styles.detailsArea}>
              <View style={styles.detailColumnLeft}>
                <Text style={styles.detailLabel}>
                  Certificate No.
                </Text>

                <Text style={styles.detailValue}>
                  {certificateNo}
                </Text>
              </View>

              <View style={styles.detailColumnCenter}>
                <Text style={styles.detailLabel}>
                  Issue Date
                </Text>

                <Text style={styles.detailValue}>
                  {formatIssuedDate(issuedAt)}
                </Text>
              </View>

              <View style={styles.detailColumnRight}>
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
              <View style={styles.footerLine} />

              <Text style={styles.footerText}>
                Professional course completion credential • ICU Learning Portal
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}