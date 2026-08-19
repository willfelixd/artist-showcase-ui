import { Routes, Route, Navigate } from 'react-router-dom'
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfUse from './TermsOfUse'

export default function Terms() {
  return (
    <Routes>
      <Route
        path="politica-de-privacidade"
        element={<PrivacyPolicy />}
      />

      <Route
        path="termos-de-uso"
        element={<TermsOfUse />}
      />

      <Route
        index
        element={<Navigate to="politica-de-privacidade" replace />}
      />
    </Routes>
  )
}