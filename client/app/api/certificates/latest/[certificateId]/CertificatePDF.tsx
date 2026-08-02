import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    padding: 50,
    textAlign: "center",
  },

  title: {
    fontSize: 32,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },

  course: {
    fontSize: 24,
    marginBottom: 20,
  },

  info: {
    fontSize: 16,
    marginTop: 12,
  },

  footer: {
    marginTop: 60,
    fontSize: 14,
  },
});


type CertificatePDFProps = {
  studentName: string;
  courseTitle: string;
  certificateNo: string;
  issuedAt: Date;
};


export default function CertificatePDF({
  studentName,
  courseTitle,
  certificateNo,
  issuedAt,
}: CertificatePDFProps) {

  return (
    <Document>

      <Page
        size="A4"
        style={styles.page}
      >

        <Text style={styles.title}>
          ICU Learning Portal
        </Text>


        <Text style={styles.subtitle}>
          Certificate of Completion
        </Text>


        <Text style={styles.info}>
          This certificate is proudly awarded to
        </Text>


        <Text style={styles.course}>
          {studentName}
        </Text>


        <Text style={styles.info}>
          for successfully completing
        </Text>


        <Text style={styles.course}>
          {courseTitle}
        </Text>


        <Text style={styles.info}>
          Certificate No: {certificateNo}
        </Text>


        <Text style={styles.info}>
          Issue Date:{" "}
          {issuedAt.toLocaleDateString("en-IN")}
        </Text>


        <View style={styles.footer}>

          <Text>
            ICU Learning Portal
          </Text>


          <Text>
            Congratulations on your achievement!
          </Text>

        </View>


      </Page>

    </Document>
  );
}